const express = require("express");
const {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser,
} = require("../db/db");
const { getSites, postSites, updateSites } = require("../db/dbSites");

const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const sites =await getSites()
        res.json(sites)
    }
    catch(e){
        console.log(e);
        res.status(500).send("server failed to connect with DB" +e);
    }
})
 router.post('/', async(req, res) => {
    try{
      const  {url, name} = req.body
      if(url){
        const site = await postSites(url, name)
        res.status(201).json(site);
      }
    }
    catch(e){
        console.log(e);
        res.status(500).send("server failed to connect with DB" +e);
    }
 })

 router.put ('/:siteId', async(req, res) => {
    try{
        const {status} = req.body
        if(status != null){
            const site =  await updateSites(req.params.siteId, status);
            if (site) {
                res.json(site);
            } else {
                res.status(404).send("user not found in DB");
            }
        } else {
            res.status(400).send("updated site must have a status");
        }  
    }
    catch(e){
        res.status(500).send(e);

    }
 })

module.exports = router