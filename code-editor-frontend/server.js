const WebSocket = require('ws');
const http = require('http');
require('dotenv').config();
const setupWSConnection = require('y-websocket/bin/utils').setupWSConnection;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("WebSocket server is running");
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws, req) => {
  const pathname = req.url.replace('/', '') || "default";

  setupWSConnection(ws, req, {
    docName: pathname,
    gc: true,
  });
});

const port = process.env.PORT || 1234;
server.listen(port, () => {
  console.log(`WebSocket server listening on port ${port}`);
});
