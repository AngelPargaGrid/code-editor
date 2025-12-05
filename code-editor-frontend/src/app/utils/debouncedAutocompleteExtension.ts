import { StateField } from "@codemirror/state";
import { debounce } from "./debounce";

export function debouncedAutocompleteExtension(editorService: any) {
  const runDebounced = debounce(() => {
    if (editorService.isAutoDebounceEnabled()) {
      editorService.triggerAutocomplete();
    }
  }, 2000);

  return StateField.define({
    create() { return null; },
    update(value, tr) {
      if (tr.docChanged && editorService.isAutoDebounceEnabled()) {
        runDebounced();
      }
      return value;
    }
  });
}
