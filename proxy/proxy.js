const http = require("http");
const net = require("net");
const server = http.createServer();

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  // יכול להיות שתרצה לבצע פעולות נוספות כאן לפני שהתהליך יופסק, או לבצע ניהול שגיאות.
  process.exit(1); // סיום התהליך עם קוד שגיאה 1
});

function nn() {
  server.on("connect", async (request, clientSocket, head) => {
    const { method, url, headers } = request;
    // console.log(headers);
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

    // console.log(username, password);

    // if (password !== "12") {
    //   clientSocket.write(
    //     "HTTP/1.1 407 Proxy Authentication Required\r\n" +
    //       'Proxy-Authenticate: Basic realm="הסיסמא לא נכונה"\r\n' +
    //       "Content-Type: text/html\r\n" +
    //       "\r\n" +
    //       "<html><body><h1>Invalid Proxy Authentication</h1></body></html>"
    //   );
    //   clientSocket.end();
    //   return;
    // }
    const [hostname, port] = headers.host.split(":");
    console.log(hostname);
    const domin = "http://localhost:4000";
    let data;
    try {
      const response = await fetch(`${domin}/api/proxy `, {
        method: "post",
        headers: {
          "Content-Type": "application/json", // Specify the content type if sending JSON data.
        },
        body: JSON.stringify({
          name: username,
          password: password,
          url: removeWWWPrefix(hostname),
        }),
      });
      data = await response.text();

      // console.log("Response from server:", data.message);
    } catch (error) {
      console.error("An error occurred:", error);
    }
    console.log(data);
    if (data == "user must have a name and an passwords") {
      clientSocket.write(
        "HTTP/1.1 407 Proxy Authentication Required\r\n" +
          'Proxy-Authenticate: Basic realm="example"\r\n' +
          "\r\n"
      );
      clientSocket.end();
      return;
    }

    if (data == "not fuond") {
      clientSocket.write(
        "HTTP/1.1 407 Proxy Authentication Required\r\n" +
          'Proxy-Authenticate: Basic realm="example"\r\n' +
          "\r\n"
      );
      clientSocket.end();
      return;
    }
    if (data == "true") {
      // console.log("dfgrh");

      clientSocket.write(
        "HTTP/1.1 200 Connection Established\r\n" +
          "Proxy-Agent: Node.js-Proxy\r\n" +
          "\r\n"
      );
      let proxyToServerSocket = net.createConnection(
        {
          host: hostname,
          port: port,
        },
        () => {
          // console.log("Proxy to server set up");
        }
      );
      clientSocket.pipe(proxyToServerSocket);
      proxyToServerSocket.pipe(clientSocket);

     
      clientSocket.on("close", () => {
        console.log("Client socket closed");
      });
      clientSocket.on("error", (e) => {
        console.log(e);
        console.log("Client socket error");
      });

      proxyToServerSocket.on("error", (err) => {
        console.log("Client to proxy error");
        console.log(err);
      });
    }
    if (data != "true") {
      clientSocket.write(
        "HTTP/1.1 403 Proxy Authentication Required\r\n" +
          'Proxy-Authenticate: Basic realm="example"\r\n' +
          "\r\n"
      );
      clientSocket.end();
      return;
    }
  });

  const port = 5000;
  server.on("close", (e) => {
    console.log("sd,mgfnrdtujkjmgnjsdhgt");
    console.log(e);
  });

  server.on("error", (err) => {
    console.log(err);
  });

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
}

try {
  function bb() {
    nn();
  }
  bb();
} catch (e) {
  console.log(e);
  bb();
}

function removeWWWPrefix(inputString) {
  // בדיקה אם המחרוזת מתחילה ב-"www"
  if (inputString.startsWith("www")) {
    // מחיקת ה-"www" מהתחלת המחרוזת
    return inputString.slice(4);
  }

  // אם המחרוזת לא מתחילה ב-"www", החזר את המחרוזת כפי שהיא
  return inputString;
}
