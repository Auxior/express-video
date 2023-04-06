const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { verifyToken } = require("../util/jwt");
const {
  registerValidator,
  loginValidator,
  updateValidator,
} = require("../middleware/validator/userValidator");
const multer = require("multer");
const upload = multer({ dest: "public/" });

router
  .post("/register", registerValidator, userController.register)
  .post("/login", loginValidator, userController.login)
  .put("/update", verifyToken(), updateValidator, userController.update)
  .post(
    "/avatar",
    verifyToken(),
    upload.single("avatar"),
    userController.avatar
  )
  .get("/subscribe/:userId", verifyToken(), userController.subscribe)
  .get("/unsubscribe/:userId", verifyToken(), userController.unsubscribe)
  .get("/getchannel", verifyToken(), userController.getchannel)
  .get("/getsubscribe/:userId", userController.getsubscribe)
  .get("/getuser/:userId", verifyToken(false), userController.getuser);

module.exports = router;
