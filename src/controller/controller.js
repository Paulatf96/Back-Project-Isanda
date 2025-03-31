const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { members } = require("../data/members");

class RouterController {
  async getMembers(req, res) {
    try {
      if (!members) {
        return res.status(404).json({ error: "Members not found" });
      }
      return res.status(200).send(members);
    } catch (error) {
      console.log("error from controller", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async createTeam(req, res) {
    try {
      const {
        name,
        projectLeaderId,
        accountManagerId,
        engineeringArchitectId,
      } = req.body;

      if (!projectLeaderId || !accountManagerId || !engineeringArchitectId) {
        return res.status(400).json({
          error:
            "Missing required member IDs: projectLeaderId, accountManagerId, or engineeringArchitectId",
        });
      }

      const alreadyInTeam = members.some(
        (member) =>
          (member.id === projectLeaderId ||
            member.id === accountManagerId ||
            member.id === engineeringArchitectId) &&
          member.inTeam
      );

      if (alreadyInTeam) {
        return res.status(400).json({
          error: "One or more members are already assigned to another team.",
        });
      }

      const newTeam = {
        id: uuidv4(),
        name,
        projectLeaderId,
        accountManagerId,
        engineeringArchitectId,
      };

      members.forEach((member) => {
        if (
          member.id === projectLeaderId ||
          member.id === accountManagerId ||
          member.id === engineeringArchitectId
        ) {
          member.inTeam = true;
        }
      });

      await fsPromises.appendFile(
        path.join(__dirname, "../data/teams.txt"),
        `${JSON.stringify(newTeam)}|`
      );

      return res.status(200).send("Team created successfully");
    } catch (error) {
      console.log("Error creating team", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getTeams(req, res) {
    try {
      const contentFile = await fsPromises.readFile(
        path.join(__dirname, "../data/teams.txt"),
        { encoding: "utf-8" }
      );

      const teams = contentFile.split("|").filter(Boolean).map(JSON.parse);

      const response = teams.map((team) => {
        const teamMembers = members.filter((member) =>
          [
            team.projectLeaderId,
            team.accountManagerId,
            team.engineeringArchitectId,
          ].includes(member.id)
        );
        return {
          id: team.id,
          name: team.name,
          members: teamMembers,
        };
      });

      return res.status(200).json(response);
    } catch (error) {
      console.error("Error retrieving teams", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteTeam(req, res) {
    try {
      const { teamId } = req.body;

      const contentFile = await fsPromises.readFile(
        path.join(__dirname, "../data/teams.txt"),
        { encoding: "utf-8" }
      );

      let teams = contentFile.split("|").filter(Boolean);

      const teamIndex = teams.findIndex(
        (team) => JSON.parse(team).id === teamId
      );

      if (teamIndex === -1) {
        return res.status(404).json({ error: "Team not found" });
      }

      teams.splice(teamIndex, 1);

      const deletedTeam = JSON.parse(teams[teamIndex]);
      const memberIds = [
        deletedTeam.projectLeaderId,
        deletedTeam.accountManagerId,
        deletedTeam.engineeringArchitectId,
      ];

      members.forEach((member) => {
        if (memberIds.includes(member.id)) {
          member.inTeam = false;
        }
      });

      await fsPromises.writeFile(
        path.join(__dirname, "../data/teams.txt"),
        teams.join("|")
      );

      return res.status(200).send("Team deleted successfully");
    } catch (error) {
      console.log("Error deleting team", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new RouterController();
