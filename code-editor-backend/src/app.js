import { createServer } from './server/index.js';

export function startServer() {
  const server = createServer();
  console.log("Server Created")
  return server;
}

  startServer();

