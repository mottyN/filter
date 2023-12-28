const express = require("express");

const PORT = process.env.PROT || 6000;

const app = express();
app.on('connect', async (request, clientSocket, head) => {
    const { method, url, headers } = request;
    console.log(method);
})

app.use(function (req, res, next) { console.log(req.method, JSON.stringify(req.headers)); next(); });

app.connect('/', (req, res) => {
    console.log(req.body);
})

app.listen(PORT, () => {
  console.log("app is listening in port: " + PORT);
});
