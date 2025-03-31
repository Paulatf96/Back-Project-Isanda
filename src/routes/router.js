const express = require("express");
const router = express.Router();
const routerController = require("../controller/controller");

router.get("/members", routerController.getMembers);

module.exports = router;
