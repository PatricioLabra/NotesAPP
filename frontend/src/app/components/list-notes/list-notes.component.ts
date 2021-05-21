import { Component, OnInit } from '@angular/core';
import { NotesManagerService } from '@services/notes-manager.service';

import { Note } from '@models/note';
import { State } from '@models/states';

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.scss']
})
export class ListNotesComponent implements OnInit {

  open_notes: Array<Note>;
  inprocess_notes: Array<Note>;
  close_notes: Array<Note>;

  constructor(private noteManager: NotesManagerService) {
    this.open_notes = [];
    this.inprocess_notes = [];
    this.close_notes = [];
  }

  ngOnInit() {
    this.noteManager.getNotes().subscribe((data:any) => {
      const list_notes = data.data;

      list_notes.forEach((note: Note) => {
        switch (note.state) {
          case 'open': 
            note.state = State.OPEN;
            this.open_notes.push(note);
            break;
          case 'in_process': 
            note.state = State.IN_PROCESS;
            this.inprocess_notes.push(note);
            break;
          case 'close': 
            note.state = State.CLOSE;
            this.close_notes.push(note);
            break;
        }
      });
    });
  }

  deleteNote(note: Note) {
    //this.noteManager.removeNote(idNote);
    console.log(note.id, note.state);
  }
}
