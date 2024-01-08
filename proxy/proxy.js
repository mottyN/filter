const { log } = require("console");
const http = require("http");
const net = require("net");

const server = http.createServer();

server.on("connect", async(request, clientSocket, head) => {
  const { method, url, headers } = request;
  console.log(headers);
  // אם אין הרשאה, שלח סטטוס 407

  if (!headers["proxy-authorization"]) {
    clientSocket.write(
      "HTTP/1.1 407 Proxy Authentication Required\r\n" +
        'Proxy-Authenticate: Basic realm="example"\r\n' +
        "\r\n"
    );
    clientSocket.end();
    return;
  }

  // כאן יש לך פרטי האימות מהכותרת 'Proxy-Authorization'
  const authHeader = headers["proxy-authorization"];
  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "utf-8"
  );
  const [username, password] = credentials.split(":");

  console.log(username, password);

  let user = await reqLogin(username, password);
  if (user === false) {
    clientSocket.write(
      "HTTP/1.1 407 Proxy Authentication Required\r\n" +
        'Proxy-Authenticate: Basic realm="הסיסמא לא נכונה"\r\n' +
        "Content-Type: text/html\r\n" +
        "\r\n" +
        "<html><body><h1>Invalid Proxy Authentication</h1></body></html>"
    );
    clientSocket.end();
    return;
  }
  const [hostname, port] = headers.host.split(":");
  let urlm = await reqUrl(username, password, hostname);
  if (urlm === false) {
    console.log("gfer");
    clientSocket.write(
      "HTTP/1.1 403 Proxy Authentication Required\r\n" +
        'Proxy-Authenticate: Basic realm="  סגור"\r\n' 
       
    );
    clientSocket.end();
    return;
  }
  let proxyToServerSocket = net.createConnection(
    {
      host: hostname,
      port: port,
    },
    () => {
      console.log("Proxy to server set up");
    }
  );
  // כאן תוכל לבצע את אימות המשתמש והסיסמה
  // ...

  // נשלח אישור CONNECT ללקוח
  clientSocket.write(
    "HTTP/1.1 200 Connection Established\r\n" +
      "Proxy-Agent: Node.js-Proxy\r\n" +
      "\r\n"
  );

  clientSocket.pipe(proxyToServerSocket);
  proxyToServerSocket.pipe(clientSocket);
});
const port = 6000;

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

const reqLogin = async (username, password) => {
  try {
    const domin = "http://localhost:4000";
    const response = await fetch(`${domin}/api/login?admin `, {
      method: "post",
      headers: {
        "Content-Type": "application/json", // Specify the content type if sending JSON data.
      },
      body: JSON.stringify({
        name: username,
        password: password,
      }),
    });
    // const data = await response.json();
    if (response.status === 201) {
      return true;
    }
  } catch (e) {
    console.log(e);
  }
  return false;
};

const reqUrl = async (username, password, url) => {
  try {
    const domin = "http://localhost:4000";
    const response = await fetch(`${domin}/api/proxy `, {
      method: "post",
      headers: {
        "Content-Type": "application/json", // Specify the content type if sending JSON data.
      },
      body: JSON.stringify({
        name: username,
        password: password,
        url : url
      }),
    });
    const data = await response.text();
    console.log(data);
    if (data === 'true') {
      return true;
    }
  } catch (e) {
    console.log(e);
  }
  return false;
};
