import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Note } from '@models/note';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent {

  constructor(private router: Router) { }

  processNewNote(newNote: Note) {
    console.log('from create note: ', newNote);
    this.router.navigate(['list-notes']);
  }
}
