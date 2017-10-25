import express = require("express");
import demo = require("$router/demo");

const router = express.Router();
router.use("/", demo);

export = router;
