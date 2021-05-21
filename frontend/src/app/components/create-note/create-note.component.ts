import { Component } from '@angular/core';

import { Note } from '@models/note';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent {

  constructor() { }

  processNewNote(newNote: Note) {
    console.log('from create note: ', newNote);
  }
}
