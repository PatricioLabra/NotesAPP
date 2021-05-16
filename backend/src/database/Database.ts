import { promises } from 'fs';
import { Note } from './models/note';
import { State } from './models/states';

export class Db {
  notes: Array<Note> = [];
  last_id: number = 0;

  constructor() {}

  async loadNotes() {
    const dataString: string = await promises.readFile('./data.json', 'utf-8');
    const data: any = JSON.parse(dataString);

    this.last_id = data.database_info.last_id;
    data.notes.forEach((note: Note) => {
      switch (note.state) {
        case 'process': note.state = State.PROCESS; break;
        case 'open': note.state = State.OPEN; break;
        case 'close': note.state = State.CLOSE; break;
      }
    });

    this.notes = data.notes as Array<Note>;
  }

  async saveNotes() {
    const data: any = {
      "database_info": {
        "last_id": this.last_id
      },
      "notes": this.notes
    };

    const dataString: string = JSON.stringify(data);
    await promises.writeFile('./data.json', dataString);
  }

  addNote(newNote: Note) {
    this.last_id++;
    newNote.id = this.last_id;
    this.notes.push(newNote);

    return this.last_id;
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

  updateNote(idNote: number , updatedNote: Note) {
    const index = this.searchIndexNote(idNote);

    if (index != null)
      this.notes[index] = updatedNote;
  }

  private searchIndexNote(idNote: number) {
    return this.notes.findIndex(note => note.id == idNote)
  }
}