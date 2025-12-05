import {
  CompletionContext,
  Completion,
} from "@codemirror/autocomplete";
import { EditorService } from "../services/editor.service";

export function geminiCompletionSource(apiUrl: string, editorService: EditorService) {
  return async (context: CompletionContext) => {

    const word = context.matchBefore(/\w*/);

    if (!word || (word.from === word.to && !context.explicit)) {
      return null;
    }

    const editorText = context.state.doc.toString();
    const cursorPos = context.pos;

    editorService.setLoading(true);
    
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: editorText,
          cursor: cursorPos,
          language: "Node.js (JavaScript)",
        }),
      });

      const json = await response.json();
      const suggestion = json.suggestion;

      if (!suggestion) return null;

      return {
        from: word.from,
        options: [
          {
            label: suggestion.trim(),
            type: "text",
            apply: suggestion,
          } as Completion,
        ],
      };
    } catch (err) {
      console.error("Completion error:", err);
      return null;
    } finally {
      editorService.setLoading(false);
    }
  };
}
