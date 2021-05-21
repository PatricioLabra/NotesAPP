import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListNotesComponent } from '@components/list-notes/list-notes.component';


const routes: Routes = [
  { path: '', component: ListNotesComponent },
  { path: 'list_notes/', component: ListNotesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
