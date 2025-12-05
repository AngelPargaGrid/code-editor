import { Component, ElementRef, ViewChild, OnInit, AfterViewInit, OnDestroy, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { EditorService } from '../services/editor.service';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements AfterViewInit {

  @Input() roomId!: string;

  @ViewChild('codeEditor', { static: true })
  codeEditor!: ElementRef<HTMLDivElement>;

  private editor = inject(EditorService);
  loading$ = this.editor.loading$;

  toggleAutoDebounce(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.editor.setAutoDebounce(checked);
  }

  ngAfterViewInit() {
    if (!this.roomId) {
      throw new Error("EditorComponent: roomId is required");
    }

    this.editor.init(this.codeEditor.nativeElement, this.roomId);
  }

  autocomplete(): void {
    this.editor.triggerAutocomplete()
  }
}
