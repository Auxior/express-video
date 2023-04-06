const jwt = require("jsonwebtoken");
const { uuid, time } = require("../config/config.default");
const { promisify } = require("util");
const tojwt = promisify(jwt.sign);
const verify = promisify(jwt.verify);

module.exports.verifyToken = function (required = true) {
  return async (req, res, next) => {
    let token = req.headers.authorization;
    token = token ? token.split("Bearer ")[1] : null;
    if (token) {
      try {
        let userinfo = await verify(token, uuid);
        req.user = userinfo;
        next();
      } catch (error) {
        res.status(402).json({ error: "token无效" });
      }
    } else if (required) {
      res.status(402).json({ error: "请传入token" });
    } else {
      next();
    }
  };
};

module.exports.createToken = async (userinfo) => {
  const token = await tojwt({ userinfo }, uuid, { expiresIn: time });
  return token;
};
