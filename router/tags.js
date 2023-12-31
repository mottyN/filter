const express = require("express");
const { addTag, apdatTagAdmin, deleteTags, getAllTassAdmin } = require("../db/dbTags");

const router = express.Router();
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

router.post('/admin',async(req, res) => {
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
router.put('/admin',async(req, res) => {
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
router.delete('/admin',async(req, res) => {
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