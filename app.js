const http = require('http');
const url = require('url');
const net = require('net');

// יצירת שרת HTTP
const httpServer = http.createServer((req, res) => {
  const { method, headers, url: reqUrl } = req;
  const { port, hostname } = url.parse(reqUrl);

  // בדיקה אם הבקשה היא CONNECT
  if (method === 'CONNECT') {
    handleConnect(req, res, { port, hostname });
  } else {
    // פעולה אחרת - העברת הבקשה לשרת המקור
    handleHttp(req, res);
  }
});

// האזנה לפורט 8080 (אתה יכול לשנות את הפורט כרצונך)
const PORT = process.env.PROT || 4000;;
httpServer.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});

// פונקציה להעברת בקשות CONNECT לשרת המקור
function handleConnect(req, res, { port, hostname }) {
  const serverSocket = net.connect(port, hostname, () => {
    // יצירת חיבור בין הקליינט ובין שרת המקור
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

// פונקציה להעברת בקשות HTTP לשרת המקור
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
