const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});
const server = http.createServer((req, res) => {
  proxy.web(req, res, { target: 'https://hm-news.co.il/' });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});