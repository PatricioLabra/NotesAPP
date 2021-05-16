import { Note } from './models/note';
import { State } from './models/states';
import data from './data.json';

export class Db {
  notes: Array<Note> = [];
  last_id: number = 0;

  constructor() {
    this.loadNotes();
  }

  loadNotes() {
    this.last_id = data.database_info.last_id;
    data.notes.forEach(note => {
      switch (note.state) {
        case 'process': note.state = State.PROCESS; break;
        case 'open': note.state = State.OPEN; break;
        case 'close': note.state = State.CLOSE; break;
      }
    });

    this.notes = data.notes as Array<Note>;
  }

  addNote(newNote: Note) {
    this.last_id++;
    newNote.id = this.last_id;
    this.notes.push(newNote);
  }

  removeNote(idNote: number) {
    this.notes = this.notes.filter(note => note.id != idNote);
  }

  searchNote(idNote: number) {
    const index = this.searchIndexNote(idNote);
    if (index != -1)
      return this.notes[index];
    else
      return null;
  }

  updateNote(idNote:number , updatedNote: Note) {
    const index = this.searchIndexNote(idNote);

    if (index != null)
      this.notes[index] = updatedNote;
  }

  private searchIndexNote(idNote: number) {
    return this.notes.findIndex(note => note.id == idNote)
  }
}