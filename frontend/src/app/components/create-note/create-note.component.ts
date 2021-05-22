import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotesManagerService } from '@services/notes-manager.service';

import { Note } from '@models/note';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent {

  constructor(
    private router: Router,
    private notesManager: NotesManagerService
    ) { }

  processNewNote(newNote: Note) {
    this.notesManager.addNote(newNote).subscribe((data: any) => {
      this.router.navigate(['list-notes']);
    });
  }
}
