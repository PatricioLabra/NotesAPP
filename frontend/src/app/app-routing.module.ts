import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// My Components
import { CreateNoteComponent } from '@components/create-note/create-note.component';
import { ListNotesComponent } from '@components/list-notes/list-notes.component';

const routes: Routes = [
  { path: '', component: CreateNoteComponent },
  { path: 'create_note', component: CreateNoteComponent },
  { path: 'list_notes', component: ListNotesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
