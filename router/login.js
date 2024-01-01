const jwt = require('jsonwebtoken')
require('dotenv').config()
const env = require('dotenv').config();
const express = require("express");
let refreshTokens = []

const {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser,
} = require("../db/db");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const {   name, password } = req.body;
       console.log( password);
        if (name &&  password) {
            console.log(req.body);
            
            const users = await getUsers();
            console.log(users);
            const user = findUser(name, password, users)
            if(user){

                const user = { name: name }
                const accessToken = generateAccessToken(user)
                const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
                refreshTokens.push(refreshToken)
                res.status(201).json({...user, accessToken: accessToken, refreshToken: refreshToken});

                // res.status(200).json(user);
            }
            else{
                res.status(403).send('not fuond');
            }
        } else {
            res.status(400).send("user must have a name and an passwords");
        }
    } catch (error) {
        res.status(500).send("server failed to connect with DB " + error);
    }
});
module.exports = router

function findUser(name, password ,users ) {
    // עבור כל משתמש במערך
    for (let i = 0; i < users.length; i++) {
        // בדיקה אם השם משתמש והסיסמה תואמים
        if (users[i].name === name && users[i].password == password) {
            // אם תואמים, החזרת המשתמש
            return users[i];
        }
    }
    // אם לא נמצא משתמש עם הנתונים שסופקו
    return null;
}


function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
  }
  