const http = require('http');
const net = require("net");

const server = http.createServer()
 
server.on('connect', (request, clientSocket, head) => {
    const { method, url, headers } = request;
    console.log(headers);
    // אם אין הרשאה, שלח סטטוס 407

    if (!headers['proxy-authorization']) {
        clientSocket.write('HTTP/1.1 407 Proxy Authentication Required\r\n' +
                           'Proxy-Authenticate: Basic realm="example"\r\n' +
                           '\r\n');
        clientSocket.end();
        return;
      }
    
      // כאן יש לך פרטי האימות מהכותרת 'Proxy-Authorization'
      const authHeader = headers['proxy-authorization'];
      const base64Credentials = authHeader.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
      const [username, password] = credentials.split(':');

      console.log(username, password);
      if (password !== '12') {
        clientSocket.write('HTTP/1.1 407 Proxy Authentication Required\r\n' +
        'Proxy-Authenticate: Basic realm="הסיסמא לא נכונה"\r\n' +
        'Content-Type: text/html\r\n' +
        '\r\n' +
        '<html><body><h1>Invalid Proxy Authentication</h1></body></html>');
clientSocket.end();
        return;
      }
      const [hostname, port] = headers.host.split(':');
      let proxyToServerSocket = net.createConnection(
        {
            host: hostname,
            port: port
        },
        () => {
            console.log("Proxy to server set up");
        }
    );
      // כאן תוכל לבצע את אימות המשתמש והסיסמה
      // ...
    
      // נשלח אישור CONNECT ללקוח
      clientSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                         'Proxy-Agent: Node.js-Proxy\r\n' +
                         '\r\n');

                         clientSocket.pipe(proxyToServerSocket);
                         proxyToServerSocket.pipe(clientSocket)

  });
const port = 3000;

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

