import { Component } from '@angular/core';
import { NotesManagerService } from '@services/notes-manager.service';

import { Note } from '@models/note';
import { State } from '@models/states';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private notesManager: NotesManagerService) {}

  // Just for debuging, remove later
  testService() {
    const note: Note = {
      "title": "Nota modificada",
      "description": "descripcion modificada ",
      "state": State.CLOSE,
      "id": 1
    };

    const idtoDelete = 1;
    

    // Change just the function after "this.notesManager."
    //const obs = this.notesManager.addNote(note) //<--- ready
    const obs = this.notesManager.getNotes() //<--- ready
    //const obs = this.notesManager.updateNote(note) //<--- ready
    //const obs = this.notesManager.removeNote(idtoDelete) //<--- ready




    obs.subscribe(res => {
      console.log(res);
    });
  }
}
