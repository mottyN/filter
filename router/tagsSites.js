const express = require("express");
const { getTagsSites, addTagSite, deleteTagsSite, updetTagsSite } = require("../db/dbSitesTags");

const router = express.Router();

router.get('/:tagId', async(req, res) => {
    console.log("asfewsf");
    try{
        // const tagId = await getUser(req.params.tagId);
        // if (!tagId) {
        //   res.status(500).send("not user");
        //   return
        // }
        const sites = await getTagsSites(req.params.tagId);
        res.json(sites)
        // console.log('11111111111');
    }
    catch(e){
        res.status(500).send("server failed to connect with DB " + e);
    }
})

router.post('/', async(req, res) => {
    try{
        console.log( req.body.status?  req.body.status : 1);
        const {tagId, url, name} = req.body;
        const t  = await addTagSite(tagId, url, name, req.body.status !== 1?  req.body.status : 1)
        res.status(201).json(t);  
      }
    catch(e){
        res.status(500).send("server failed to connect with DB " + e);
    }
})
router.put('/', async(req, res) => {
    try{
        const {id, status} = req.body;
        const t  = await updetTagsSite(id, status)
        res.status(201).json(t);  
      }
    catch(e){
        res.status(500).send("server failed to connect with DB " + e);
    }
})

router.delete('/:id', async(req,res) => {
    try{
        const deleted = await deleteTagsSite(req.params.id)
        if (deleted) {
            res.status(204).send("DSGDFYH");
        } else {
            res.status(404).send("user not found in DB");
        }
    }
    catch(e){
        res.status(500).send("server failed to connect with DB " + e);

    }
})
module.exports = router;