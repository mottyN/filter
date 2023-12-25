// Import of net module
const { log } = require("console");
const { Socket } = require("dgram");
const net = require("net");
const server = net.createServer((socket) => {
    const clientAddress = socket.remoteAddress;
    // console.log(socket);
});

server.on("connection", (clientToProxySocket) => {
    // console.log(server.remoteAddress);
    console.log("Client connected to proxy");
    clientToProxySocket.once("data", (data) => {
      
    
       
        // console.log(data.toString('windows-1255'));
        console.log(data.toString('utf-8').replace(/�/g, ''));
    });
});

server.on("error", (err) => {
    console.log("Some internal server error occurred");
    console.log(err);
});

server.on("close", () => {
    console.log("Client disconnected");
});

server.listen(
    {
        host: "0.0.0.0",
        port: 7070,
    },
    () => {
        console.log("Server listening on 0.0.0.0:8080");
    }
);