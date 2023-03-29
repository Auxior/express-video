const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const validator = require("../middleware/validator/userValidator");
const { verifyToken } = require("../util/jwt");
const multer = require("multer");
const upload = multer({ dest: "public/" });

router
  .post("/registers", validator.register, userController.register)
  .post("/logins", validator.login, userController.login)
  .get("/lists", verifyToken, userController.list)
  .put("/", verifyToken, validator.update, userController.update)
  .post(
    "/headimg",
    verifyToken,
    upload.single("headimg"),
    userController.headimg
  )
  .delete("/", userController.delete);

module.exports = router;
