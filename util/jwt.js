const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { uuid } = require("../config/config.default");
const tojwt = promisify(jwt.sign);
const verify = promisify(jwt.verify);

module.exports.verifyToken = function (required = true) {
  return async (req, res, next) => {
    var token = req.headers.authorization;
    token = token ? token.split("Bearer ")[1] : null;
    if (token) {
      try {
        let userinfo = await verify(token, uuid);
        req.user = userinfo;
        next();
      } catch (error) {
        res.status(402).json({ error: "无效的token" });
      }
    } else if (required) {
      res.status(402).json({ error: "请传入token" });
    } else {
      next();
    }
  };
};

module.exports.createToken = async (userinfo) => {
  var token = await tojwt({ userinfo }, uuid, { expiresIn: 60 * 60 * 24 });
  return token;
};
