const net = require('net');
const http = require('http');
const https = require('https');
const url = require('url');

function handleClient(clientSocket) {
    let requestData = '';

    clientSocket.on('data', (data) => {
        requestData += data;

        // אם הגענו לסוף הבקשה (הסיומת "\r\n\r\n" מסמלת סיום של פקודת HTTP)
        if (requestData.includes('\r\n\r\n')) {
            console.log(`Received: ${requestData}`);

            // פרטים מהבקשה שהתקבלה
            const requestLines = requestData.split('\r\n');
            const requestFirstLine = requestLines[0].split(' ');

            // שליחת בקשה לשרת המקורי
            const urlObj = new URL(requestFirstLine[1]);
            const requestOptions = {
                hostname: urlObj.hostname,
                port: (urlObj.protocol === 'https:') ? 443 : 80,
                path: urlObj.pathname,
                method: 'GET'
            };

            const proxyRequest = (urlObj.protocol === 'https:') ? https.request(requestOptions) : http.request(requestOptions);

            proxyRequest.on('response', (proxyResponse) => {
                // שליחת תשובה ללקוח
                clientSocket.write(`HTTP/${proxyResponse.httpVersion} ${proxyResponse.statusCode} ${proxyResponse.statusMessage}\r\n`);
                Object.keys(proxyResponse.headers).forEach((key) => {
                    // clientSocket.write(`${key}: ${proxyResponse.headers[key]}\r\n`);
                });
                // clientSocket.write('\r\n');

                proxyResponse.on('data', (chunk) => {
                    // שליחת נתונים ללקוח
                    // clientSocket.write(chunk);
                });

                proxyResponse.on('end', () => {
                    clientSocket.end();
                });
            });

            proxyRequest.on('error', (err) => {
                console.error(`Proxy Request Error: ${err.message}`);
                clientSocket.end();
            });

            proxyRequest.end();
        }
    });

    clientSocket.on('error', (err) => {
        console.error(`Client Socket Error: ${err.message}`);
    });
}

function startProxyServer() {
    // הגדרת פורט לשרת הפרוקסי
    const bindIp = "127.0.0.1";
    const bindPort = 8080;

    // יצירת שרת
    const server = net.createServer(handleClient);

    server.listen(bindPort, bindIp, () => {
        console.log(`[*] Listening on ${bindIp}:${bindPort}`);
    });

    server.on('error', (err) => {
        console.error(`Server Error: ${err.message}`);
    });
}

if (require.main === module) {
    startProxyServer();
}
