const express = require("express");
const {
  getSiteUser,
  addSiteUser,
  updateSiteUser,
} = require("../db/dbSiteUser");
const { getUser } = require("../db/db");
const { updateSites } = require("../db/dbSites");
const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const sites = await getSiteUser(req.params.userId);
    res.json(sites);
  } catch (e) {
    console.log(e);
    res.status(500).send("server failed to connect with DB" + e);
  }
});

router.post("/:userId", async (req, res) => {
  console.log(req.params.userId);
  const user = await getUser(req.params.userId);
  if (!user) {
    res.status(500).send("not user");
    return;
  }
  try {
    const { url, name } = req.body;
    if (url) {
      const site = await addSiteUser(req.params.userId, url, name);
      res.status(201).json(site);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("server failed to connect with DB" + e);
  }
});



router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    // console.log(status);
    if (status !== null) {
      const site = await updateSiteUser(req.params.id, status);
    //   console.log(req.params.id);
      if (site) {
        res.json(site);
      } else {
        res.status(404).send("record not found in DB");
      }
    } else {
      res.status(400).send("updated site must have a status");
    }
  } catch (e) {
    res.status(500).send(e);
  }
});
module.exports = router;
