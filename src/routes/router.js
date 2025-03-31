const express = require("express");
const router = express.Router();
const routerController = require("../controller/controller");

router.get("/members", routerController.getMembers);

router.get("/teams", routerController.getTeams);

router.post("/create/team", routerController.createTeam);

router.post("/delete/team", routerController.deleteTeam);

module.exports = router;
