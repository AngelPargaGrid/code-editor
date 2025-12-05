declare module "y-websocket" {
  import * as Y from "yjs";
  import { Awareness } from "y-protocols/awareness";

  export class WebsocketProvider {
    constructor(serverUrl: string, roomName: string, doc: Y.Doc, opts?: any);
    doc: Y.Doc;
    awareness: Awareness;
    connect(): void;
    disconnect(): void;
    destroy(): void;
    sync?: boolean;
  }
}