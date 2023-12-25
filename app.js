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




const PORT = process.env.PROT || 4000;

const app = express();
app.use(cors())
app.use(express.json());

app.use("/api/login", login);
app.use("/api/users", usersRouter);
app.use("/api/sites", sitesRouter);
app.use("/api/sitesUser", sitesUser);
app.use("/api/tagsUser", tagsUser);
app.use("/api/tagSite", tagSite);









app.use("/",express.static(path.join(__dirname, "client",'build')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'))
})


const run = async() => {

    const dbConnection = await checkDBConnection();
    if (dbConnection) {
        app.listen(PORT, () => {
            console.log("app is listening in port: " + PORT);
        });
    }
}
run()
// console.log(process.env);