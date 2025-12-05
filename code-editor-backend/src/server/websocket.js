import { WebSocketServer } from 'ws';
import { setupWSConnection } from '../core/yjs/ws-connection.js';

export function createWebSocketServer(httpServer) {
  const wss = new WebSocketServer({ server: httpServer });

  wss.on('connection', setupWSConnection);

  return wss;
}
