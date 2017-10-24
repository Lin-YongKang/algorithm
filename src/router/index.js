const express = require("express");
const router = express.Router();
const demo = require("$router/demo");

router.use("/", demo);

module.exports = router;
