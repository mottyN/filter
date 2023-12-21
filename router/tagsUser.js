const express = require("express");
const { getTagsUser, addTagsUser, deleteTagUser, getAllTass } = require("../db/dbTagsUser");
const { getUser } = require("../db/db");
const router = express.Router();

router.get('/', async(req,res) => {
    try{
        // console.log(sf);
        const tags = await getAllTass()
        res.json(tags)
    }
    catch(e){
        res.status(500).send("server failed to connect with DB " + e);

    }
})

router.get('/:userId', async(req, res) =>{
    
    try{
        const user = await getUser(req.params.userId);
    if (!user) {
      res.status(500).send("not user");
      return;
    }
        const tags = await getTagsUser(req.params.userId)
        res.json(tags)
    }
    catch(e){
        res.status(500).send("server failed to connect with DB " + e);

    }
})

router.post('/:userId', async(req, res) => {
    const user = await getUser(req.params.userId);
  if (!user) {
    res.status(500).send("not user");
    return;
  }
  try{
    const { tagId  } = req.body;
    const t =await addTagsUser(tagId, req.params.userId)
    res.status(201).json(t);
  }
  catch(e){
    res.status(500).send("server failed to connect with DB " + e);

  }
})

router.delete('/:userId/:tagId', async(req, res) => {
    try{
        const user = await getUser(req.params.userId);
        if (!user) {
          res.status(500).send("not user");
          return;
        }
        const deleted = await deleteTagUser(req.params.userId, req.params.tagId)
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
module.exports = router