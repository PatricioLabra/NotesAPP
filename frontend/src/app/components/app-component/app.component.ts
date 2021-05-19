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
      "title": "Agregar Nota",
      "description": "Probar la conexion con la api",
      "state": State.OPEN,
      "id": 0
    };


    // Change just the function after "this.notesManager."
    const obs = this.notesManager.addNote(note)


    obs.subscribe(res => {
      console.log(res);
    });
  }
}
