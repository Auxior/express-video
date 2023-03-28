const express = require("express");
const router = express.Router();
const videoController = require("../controller/videoController");

router.get("/lists", videoController.list);

module.exports = router;
