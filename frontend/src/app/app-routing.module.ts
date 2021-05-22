import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// My Components
import { CreateNoteComponent } from '@components/create-note/create-note.component';
import { ListNotesComponent } from '@components/list-notes/list-notes.component';
import { UpdateNoteComponent } from '@components/update-note/update-note.component';

const routes: Routes = [
  { path: '', component: CreateNoteComponent },
  { path: 'create-note', component: CreateNoteComponent },
  { path: 'list-notes', component: ListNotesComponent },
  { path: 'update-note/:id', component: UpdateNoteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
