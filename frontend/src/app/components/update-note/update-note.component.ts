import { Component, OnInit } from '@angular/core';

import { Note } from '@models/note';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {

  noteToUpdate: Note;

  constructor() { }

  ngOnInit() {
  }

  processUpdatedNote(note: Note) {

  }
}
