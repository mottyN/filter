const express = require('express');
const http = require('http');
const net = require('net');

const app = express();
const router = express.Router();

router.use((req, res, next) => {
  if (req.method === 'CONNECT') {
    const { method, url, headers } = req;
    console.log(headers);

    if (!headers['proxy-authorization']) {
      res.writeHead(407, {
        'Proxy-Authenticate': 'Basic realm="example"'
      });
      res.end();
      return;
    }

    const authHeader = headers['proxy-authorization'];
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    console.log(username, password);
    if (password !== '12') {
      res.writeHead(407, {
        'Proxy-Authenticate': 'Basic realm="הסיסמא לא נכונה"',
        'Content-Type': 'text/html'
      });
      res.end('<html><body><h1>Invalid Proxy Authentication</h1></body></html>');
      return;
    }

    const [hostname, port] = headers.host.split(':');
    let proxyToServerSocket = net.createConnection(
      {
        host: hostname,
        port: port
      },
      () => {
        console.log('Proxy to server set up');
        res.writeHead(200, {
          'Connection': 'Established',
          'Proxy-Agent': 'Node.js-Proxy'
        });
        res.end();
        req.socket.pipe(proxyToServerSocket);
        proxyToServerSocket.pipe(req.socket);
      }
    );
  } else {
    // טיפול בבקשות אחרות כאן...
    next();
  }
});

app.use(router);

const port = 3000;

http.createServer(app).listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
