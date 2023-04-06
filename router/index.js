const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/video", require("./video"));
router.use("/vod", require("./vod"));

module.exports = router;
