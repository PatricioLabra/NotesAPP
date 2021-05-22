import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NotesManagerService } from '@services/notes-manager.service';
import { Note } from '@models/note';
import { State } from '@models/states';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {

  noteToUpdate: Note;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private notesManager: NotesManagerService
    ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;

    this.notesManager.searchNote(this.id).subscribe((res: any) => {
      this.noteToUpdate = res.data as Note;
    });
  }

  processUpdatedNote(note: Note) {
    console.log(note);
    this.router.navigate(['list-notes']);
  }
}
