const express = require("express");
const router = express.Router();
const vodController = require("../controller/vodController");
const { verifyToken } = require("../util/jwt");

router.get("/getvod", verifyToken(), vodController.getvod);

module.exports = router;
