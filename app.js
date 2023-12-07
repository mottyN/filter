const express = require('express');
const http = require('http');
const net = require('net');
const url = require('url');

const app = express();

app.use((req, res) => {
  const { method, headers, url: reqUrl } = req;
  const { port, hostname } = url.parse(reqUrl);

  if (method === 'CONNECT') {
    handleConnect(req, res, { port, hostname });
  } else {
    handleHttp(req, res);
  }
});

const server = http.createServer(app);

const PORT = process.env.PROT || 4000;;
server.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});

function handleConnect(req, res, { port, hostname }) {
  const serverSocket = net.connect(port, hostname, () => {
    res.write('HTTP/1.1 200 Connection Established\r\n\r\n');
    serverSocket.pipe(res);
    res.pipe(serverSocket);
  });

  serverSocket.on('error', (err) => {
    console.error(`Error connecting to ${hostname}:${port}: ${err.message}`);
    res.writeHead(500, 'Connection failed');
    res.end();
  });
}

function handleHttp(req, res) {
  const { method, headers, url: reqUrl } = req;
  const { port, hostname } = url.parse(reqUrl);

  const options = {
    method,
    headers,
    hostname,
    port,
    path: reqUrl,
  };

  const proxyRequest = http.request(options, (proxyResponse) => {
    res.writeHead(proxyResponse.statusCode, proxyResponse.headers);
    proxyResponse.pipe(res, {
      end: true
    });
  });

  proxyRequest.on('error', (err) => {
    console.error(`Proxy request to ${hostname}:${port} failed: ${err.message}`);
    res.writeHead(500, 'Proxy request failed');
    res.end();
  });

  req.pipe(proxyRequest, {
    end: true
  });
}
