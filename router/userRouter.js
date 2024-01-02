const express = require("express");
const jwt = require('jsonwebtoken')
require('dotenv').config()
const env = require('dotenv').config();


const {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser,
} = require("../db/db");
let refreshTokens = []

const router = express.Router();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader 
    console.log(authHeader , token);
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }
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

router.get("/", authenticateTokenAdmin,async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).send("server failed to connect with DB");
    }
});

router.get("/:id", authenticateTokenAdmin,async (req, res) => {
    try {
        const user = await getUser(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send("user not found in DB");
        }
    } catch (error) {
        res.status(500).send("server failed to connect with DB");
    }
});

router.post("/", async (req, res) => {
    try {
        const { name,  email, password } = req.body;
        // console.log(req.body);
        if (name  && email && password) {
            console.log(req.body);
            const newUser = await createUser(name, email, password);


            const user = { name: name }
            const accessToken = generateAccessToken(user)
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
            refreshTokens.push(refreshToken)
            res.status(201).json({...newUser, accessToken: accessToken, refreshToken: refreshToken});
        } else {
            res.status(400).send("user must have a name and an age");
        }
    } catch (error) {
        res.status(500).send("server failed to connect with DB"+error);
    }
});

router.delete("/:id", authenticateToken,async (req, res) => {
    try {
        const deleted = await deleteUser(req.params.id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send("user not found in DB");
        }
    } catch (error) {
        res.status(500).send("server failed to connect with DB");
    }
});

router.put("/:id", authenticateToken,async (req, res) => {
    try {
        const { name, userName, email, passwords } = req.body;
        if (name && userName && email && passwords) {
            const updatedUser = await updateUser(req.params.id, name, userName, email, passwords);
            if (updatedUser) {
                res.json(updatedUser);
            } else {
                res.status(404).send("user not found in DB");
            }
        } else {
            res.status(400).send("updated user must have a name and an age");
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
  }
  

module.exports = router