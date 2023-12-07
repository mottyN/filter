const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  console.log(`Proxying request to: ${req.url}`);
  proxy.web(req, res, { target: req.url });
});

const PORT = process.env.PROT || 4000;;

server.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
