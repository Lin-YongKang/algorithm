import express = require("express");
import controller = require("$controller/index");
const router = express.Router();

router.all("/api/demo", controller.demo.api.params);

router.get("/demo", controller.demo.view);

router.get("/error", controller.demo.error);

export = router;
