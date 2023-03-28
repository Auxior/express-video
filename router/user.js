const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const validator = require("../middleware/validator/userValidator");
const { verifyToken } = require("../util/jwt");

router
  .post("/registers", validator.register, userController.register)
  .post("/logins", validator.login, userController.login)
  .get("/lists", verifyToken, userController.list)
  .delete("/", userController.delete);

module.exports = router;
