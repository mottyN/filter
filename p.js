const fs = require('fs');
const net = require('net');

const logFilePath = 'clientData.txt';

const server = net.createServer((clientToProxySocket) => {
    const clientAddress = clientToProxySocket.remoteAddress;

    clientToProxySocket.on('data', (data) => {
        // כתיבה לקובץ הטקסט
        fs.appendFile(logFilePath, data.toString(), (err) => {
            if (err) {
                console.error('שגיאה בכתיבה לקובץ:', err);
            } else {
                console.log('נתונים נכתבו לקובץ:', data.toString());
            }
        });

        // אם תרצה, תוכל להמשיך ולשלוח את הנתונים לשרת היעד
        // proxyToServerSocket.write(data);
    });

    clientToProxySocket.on('end', () => {
        console.log('לקוח מנותק');
    });
});

server.on('error', (err) => {
    console.log('אירעה שגיאה פנימית בשרת');
    console.log(err);
});

server.on('close', () => {
    console.log('השרת נסגר');
});

server.listen(
    {
        host: '0.0.0.0',
        port: 9090,
    },
    () => {
        console.log('השרת מאזין על 0.0.0.0:9090');
    }
);
