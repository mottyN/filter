const express = require("express");

const path = require("path");
const cors = require("cors");
const { checkDBConnection } = require("./db/db");
const login = require('./router/login')
const usersRouter = require('./router/userRouter')
const sitesRouter = require('./router/sitesRouter')
const sitesUser = require('./router/siteUser')
const tagsUser = require('./router/tagsUser')
const tagSite = require('./router/tagsSites')
const proxy = require('./router/proxy')
const email = require('./router/email')

const tags = require('./router/tags')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const env = require('dotenv').config();



const PORT = process.env.PROT || 4000;

const app = express();
app.use(cors())
app.use(express.json());

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader 
    // console.log(authHeader  ,"דכקר");
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      // console.log(err)
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


app.use("/api/login", login);
app.use("/api/users", usersRouter);
app.use("/api/sites", authenticateTokenAdmin ,sitesRouter);
app.use("/api/sitesUser",authenticateToken, sitesUser);
app.use("/api/tagsUser",authenticateToken, tagsUser);
app.use("/api/tagSite",authenticateToken, tagSite);
app.use("/api/proxy", proxy);
app.use("/api/tags",authenticateToken, tags);
app.use("/api/email", email);



app.use("/",express.static(path.join(__dirname, "client",'build')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'))
})


const run = async() => {

    const dbConnection = await checkDBConnection();
    // if (dbConnection) {
        app.listen(PORT, () => {
            console.log("app is listening in port: " + PORT);
        });
    }
// }
run()
// console.log(process.env);