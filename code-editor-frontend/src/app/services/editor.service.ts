import { Injectable } from '@angular/core';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

import { EditorState, Transaction } from '@codemirror/state';
import { EditorView, highlightActiveLine, highlightActiveLineGutter, keymap, lineNumbers } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';

import { oneDark } from "@codemirror/theme-one-dark";

import { yCollab } from 'y-codemirror.next';
import { undo, redo } from '@codemirror/commands';

import { autocompletion, startCompletion } from "@codemirror/autocomplete";
import { geminiCompletionSource } from '../editor/gemini-completion';
import { BehaviorSubject } from 'rxjs';
import { debouncedAutocompleteExtension } from "../utils/debouncedAutocompleteExtension";

@Injectable({ providedIn: 'root' })
export class EditorService {

  private ydoc!: Y.Doc;
  private provider!: WebsocketProvider;
  private view!: EditorView;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private autoDebounceSubject = new BehaviorSubject<boolean>(false);

  loading$ = this.loadingSubject.asObservable();
  autoDebounce$ = this.autoDebounceSubject.asObservable();

  setLoading(isLoading: boolean) {
    this.loadingSubject.next(isLoading);
  }


  setAutoDebounce(value: boolean) {
    this.autoDebounceSubject.next(value);
  }

  isAutoDebounceEnabled() {
    return this.autoDebounceSubject.value;
  }


  init(element: HTMLElement, roomId: string = "default") {
    this.ydoc = new Y.Doc();
    const wsUrl = (window as any).env?.WEBSOCKET_URL || 'ws://localhost:1234';
    this.provider = new WebsocketProvider(
      `${wsUrl}/${roomId}`,
      roomId,
      this.ydoc
    );
    const yText = this.ydoc.getText('codemirror');
    const undoManager = new Y.UndoManager(yText);


    const safeUndo = (view: EditorView) => {
      try {
        undoManager.undo();
      } catch (e) {
      }
      return true;
    };

    const safeRedo = (view: EditorView) => {
      try {
        undoManager.redo();
      } catch (e) { }
      return true;
    };

    const myKeymap = [
      { key: "Mod-z", run: safeUndo, preventDefault: true },
      { key: "Mod-Shift-z", run: safeRedo, preventDefault: true },
      { key: "Mod-y", run: safeRedo, preventDefault: true },
    ];


    const minHeightExtension = EditorView.theme({
      '.cm-content, .cm-gutter': {
        minHeight: '150px',
      },
      '.cm-scroller': {
        overflow: 'auto',
      },
      '.cm-activeLine.cm-line': {
        'background-color': '#0111304a'
      }
    });

    const state = EditorState.create({
      doc: yText.toString(),
      extensions: [
        yCollab(yText, this.provider.awareness, { undoManager }),
        autocompletion({
          override: [geminiCompletionSource(this.getCompletionApiUrl(), this)],
          activateOnTyping: false,
        }),
        debouncedAutocompleteExtension(this),
        keymap.of([...myKeymap, ...defaultKeymap]),
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightActiveLine(),
        oneDark,
        minHeightExtension,
      ]
    });

    this.view = new EditorView({
      state,
      parent: element,
    });

    return this.view;
  }

  getCompletionApiUrl(): string {
    return (window as any).env?.COMPLETION_API_URL || 'http://localhost:4000/api/complete';
  }

  triggerAutocomplete() {
    if (this.view) {
      startCompletion(this.view);
    }
  }
}
