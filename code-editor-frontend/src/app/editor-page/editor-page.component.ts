import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'app-editor-page',
  standalone: true,
  imports: [EditorComponent],
  styles: [`
    h1 {
      font-family: system-ui, sans-serif;
      margin-bottom: 12px;
      color: #000;
      font-size: 22px;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-align:center;
    }
  `],
  template: `
    <h1>Room: {{ roomId }}</h1>
    <app-editor [roomId]="roomId"></app-editor>
  `
})
export class EditorPageComponent implements OnInit {

  roomId!: string;
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('id')!;
    });
  }
}
