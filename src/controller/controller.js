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

      [projectLeaderId, accountManagerId, engineeringArchitectId].forEach(
        (id) => {
          const member = members.find((m) => m.id == id);
          if (member) member.inTeam = true;
        }
      );

      const newTeam = {
        id: uuidv4(),
        name,
        projectLeaderId,
        accountManagerId,
        engineeringArchitectId,
      };

      await fsPromises.appendFile(
        path.join(__dirname, "../data/teams.txt"),
        `${JSON.stringify(newTeam)}|`
      );

      return res.status(200).send("ok");
    } catch (error) {
      console.log("error creating team", error);
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
      const { id } = req.body;
      const contentFile = await fsPromises.readFile(
        path.join(__dirname, "../data/teams.txt"),
        { encoding: "utf-8" }
      );

      let teams = contentFile.split("|").filter(Boolean).map(JSON.parse);

      const teamToDelete = teams.find((team) => team.id === id);
      if (!teamToDelete) {
        return res.status(404).json({ error: "Team not found" });
      }

      teams = teams.filter((team) => team.id !== id);

      const updatedContent =
        teams.map((team) => JSON.stringify(team)).join("|") + "|";
      await fsPromises.writeFile(
        path.join(__dirname, "../data/teams.txt"),
        updatedContent,
        "utf-8"
      );

      return res.status(200).json({ message: "Team deleted successfully" });
    } catch (error) {
      console.error("Error deleting team", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new RouterController();
