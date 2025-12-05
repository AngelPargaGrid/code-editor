import * as Y from 'yjs';
import { yjsDocs } from './docs.js';

/**
 * @param {WebSocket} ws 
 * @param {http.IncomingMessage} req 
 */
export function setupWSConnection(ws, req) {
  const docName =
    new URL(req.url, `http://${req.headers.host}`).searchParams.get("room") ||
    "default";

  const ydoc = yjsDocs.getYDoc(docName);

  ws.binaryType = "arraybuffer";

  const encoder = new Y.Encoder();
  encoder.writeVarString("sync");
  Y.encodeStateAsUpdate(ydoc, encoder);
  ws.send(encoder.toUint8Array());

  ws.on("message", (message) => {
    const decoder = new Y.Decoder(new Uint8Array(message));
    const messageType = decoder.readVarString();

    if (messageType === "sync") {
      const update = decoder.readVarUint8Array();
      Y.applyUpdate(ydoc, update);
    }
  });

  ws.on("close", () => {
    console.log(`Client disconnected from ${docName}`);
  });

  console.log(`WebSocket connected to room: ${docName}`);
}
