const memberRouter = require("express").Router();
const Member = require("../models/member");

memberRouter.get("/", async (req, res) => {
  try {
    const members = await Member.findAny();
    return res.status(200).json(members);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error server");
  }
});

memberRouter.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const member = await Member.findAny(name);
    if (member.length > 0) {
      return res.status(401).json("Member already exists");
    }
    const response = await Member.create(name);
    return res.status(201).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Error server");
  }
});

memberRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Member.destroy(id);
    if (response.affectedRows === 0)
      return res.status(500).json("Error deleted member");
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json("Error server");
  }
});

module.exports = memberRouter;
