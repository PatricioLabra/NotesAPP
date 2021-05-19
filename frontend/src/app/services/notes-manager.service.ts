import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Note } from '@models/note';

@Injectable({
  providedIn: 'root'
})
export class NotesManagerService {

  API_URL = 'http://localhost:3003/';

  constructor(private http: HttpClient) { }

  obtenerNotas() {
    const path = this.API_URL + 'obtener_notas'
    return this.http.get<Note[]>(path);
  }
}
