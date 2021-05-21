import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Note } from '@models/note';
import { State } from '@models/states';

@Injectable({
  providedIn: 'root'
})
export class NotesManagerService {

  API_URL = 'http://localhost:3003/';

  constructor(private http: HttpClient) { }

  addNote(newNote: Note) {
    const path = this.API_URL + 'agregar_nota';
    return this.http.post(path, newNote);
  }

  getNotes(){
    const path = this.API_URL + 'obtener_notas';
    return this.http.get(path);
  }

  updateNote(updatedNote: Note){
    const path = this.API_URL + 'modificar_nota';
    return this.http.put(path, updatedNote);
  }

  removeNote(idtoDelete: number){
    const path = this.API_URL + `eliminar_nota/${idtoDelete}`;
    return this.http.delete(path);
  }
}
