const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((clientReq, clientRes) => {
    console.log("Client connected to proxy");

    // Handle the first chunk of data to determine the destination
    clientReq.once("data", (data) => {
        let isTLSConnection = data.toString().indexOf("CONNECT") !== -1;

        let serverPort = 80;
        let serverAddress;

        if (isTLSConnection) {
            serverPort = 443;
            serverAddress = data
                .toString()
                .split("CONNECT")[1]
                .split(" ")[1]
                .split(":")[0];
        } else {
            serverAddress = data.toString().split("Host: ")[1].split("\r\n")[0];
        }

        console.log(serverAddress);

        // Creating a connection from proxy to destination server
        let proxyToServer = http.request(
            {
                hostname: serverAddress,
                port: serverPort,
                method: clientReq.method,
                path: clientReq.url,
                headers: clientReq.headers,
            },
            (serverRes) => {
                console.log("Proxy to server set up");

                // Write the response header back to the client
                clientRes.writeHead(serverRes.statusCode, serverRes.headers);

                // Pipe the server response to the client response
                serverRes.pipe(clientRes, {
                    end: true,
                });
            }
        );

        // Handle errors from the proxyToServer request
        proxyToServer.on("error", (err) => {
            console.log("Proxy to server error");
            console.log(err);

            // Send an error response to the client
            clientRes.writeHead(500, {
                'Content-Type': 'text/plain',
            });
            clientRes.end('Proxy to server error');
        });

        // Pipe the client request to the destination server
        clientReq.pipe(proxyToServer, {
            end: true,
        });
    });
});

server.on("error", (err) => {
    console.log("Some internal server error occurred");
    console.log(err);
});

server.listen(8080, '0.0.0.0', () => {
    console.log("Server listening on 0.0.0.0:8080");
});
