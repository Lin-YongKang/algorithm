const express = require("express");
const router = express.Router();
const controller = require("$controller");

router.all("/api/demo", controller.demo.api.params);

router.get("/demo", controller.demo.view);

router.get("/error", controller.demo.error);

module.exports = router;
