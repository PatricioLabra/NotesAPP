import { Component } from '@angular/core';
import { NotesManagerService } from '@services/notes-manager.service';

import { Note } from '@models/note';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private notesManager: NotesManagerService) {}

  listarNotas() {
    this.notesManager.obtenerNotas()
    .subscribe((listaNota: Note[]) => {
      console.log(listaNota);
    });
  }
}
