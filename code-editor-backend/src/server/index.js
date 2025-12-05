import http from 'http';
import { createExpressApp } from './express.js';
import { createWebSocketServer } from './websocket.js';
import { config } from '../config/env.js';

export function createServer() {
  const app = createExpressApp();

  const server = http.createServer(app);

  const wss = createWebSocketServer(server);

  const PORT = config.port;
  server.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`);
  });

  return server;
}
