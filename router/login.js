// import express, { json } from 'express';
const express = require("express");

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
                res.status(200).json(user);
            }
            else{
                res.status(404).send('not fuond');
            }
        } else {
            res.status(400).send("user must have a name and an passwords");
        }
    } catch (error) {
        res.status(500).send("server failed to connect with DB");
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