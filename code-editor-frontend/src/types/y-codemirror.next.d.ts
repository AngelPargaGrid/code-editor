declare module "y-codemirror.next" {
  import * as Y from "yjs";
  import { Extension } from "@codemirror/state";
  import { Awareness } from "y-protocols/awareness";

  export function yCollab(yText: Y.Text, awareness: Awareness, options?: { undoManager?: any }): Extension;
}
