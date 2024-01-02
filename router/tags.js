const express = require("express");
const jwt = require('jsonwebtoken')
require('dotenv').config()
const env = require('dotenv').config();

const { addTag, apdatTagAdmin, deleteTags, getAllTassAdmin } = require("../db/dbTags");

const router = express.Router();
function authenticateTokenAdmin(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader 
    console.log(authHeader , token);
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      if (user.id !== 4) return res.sendStatus(403)

      req.user = user
      next()
    })
  }

router.get('/', async(req,res) => {
    try{
        // console.log(sf);
        const tags = await getAllTassAdmin()
        res.json(tags)
    }
    catch(e){
        res.status(500).send("server failed to connect with DB " + e);

    }
})

router.post('/user',async(req, res) => {
    try{
        // console.log( req.body.status?  req.body.status : 1);
        const {name} = req.body;
        const t  = await addTag(name, -1 )
        res.status(201).json(t);  
      }
    catch(e){
        res.status(500).send("server failed to connect with DB " + e);
    }
})

router.post('/admin',authenticateTokenAdmin,async(req, res) => {
    try{
        // console.log( req.body.status?  req.body.status : 1);
        const {name, status} = req.body;
        const t  = await addTag(name, status )
        res.status(201).json(t);  
      }
    catch(e){
        res.status(500).send("server failed to connect with DB " + e);
    }
})
router.put('/admin',authenticateTokenAdmin,async(req, res) => {
    try{
        // console.log( req.body.status?  req.body.status : 1);
        const {id, status} = req.body;
        const t  = await apdatTagAdmin(id, status )
        res.status(201).json(t);  
      }
    catch(e){
        res.status(500).send("server failed to connect with DB " + e);
    }
})
router.delete('/admin',authenticateTokenAdmin,async(req, res) => {
    try{
        // console.log( req.body.status?  req.body.status : 1);
        const {id} = req.body;
        const t  = await deleteTags(id )
        res.status(201).json(t);  
      }
    catch(e){
        res.status(500).send("server failed to connect with DB " + e);
    }
})
module.exports = router