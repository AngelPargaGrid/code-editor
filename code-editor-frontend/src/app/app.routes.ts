import { Routes } from '@angular/router';
import { EditorPageComponent } from './editor-page/editor-page.component';

export const routes: Routes = [
  {
    path: 'room/:id',
    component: EditorPageComponent
  },
  {
    path: '',
    redirectTo: '/room/default',
    pathMatch: 'full'
  }
];
