import { promises } from 'fs';
import { Note } from './models/note';
import { State } from './models/states';

export class Db {
  notes: Array<Note> = [];
  last_id: number = 0;

  constructor() {}

  /**
   * Carga las notas del archivo json data
   */
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

  /**
   * Guarda las notas en el archivo json
   */
  async saveNotes() {
    const data: any = {
      "database_info": this.last_id,
      "notes": this.notes
    };

    const dataString: string = JSON.stringify(data);
    await promises.writeFile('./data.json', dataString);
  }

  async addNote(newNote: Note) {
    this.last_id++;
    newNote.id = this.last_id;
    this.notes.push(newNote);

    await this.saveNotes();

    return this.last_id;
  }

  async removeNote(idNote: number) {
    this.notes = this.notes.filter(note => note.id != idNote);

    await this.saveNotes();
  }

  searchNote(idNote: number) {
    const index = this.searchIndexNote(idNote);
    if (index != -1)
      return this.notes[index];
    else
      return null;
  }

  async updateNote(idNote: number , updatedNote: Note) {
    const index = this.searchIndexNote(idNote);

    if (index != null)
      this.notes[index] = updatedNote;

    await this.saveNotes();
  }

  private searchIndexNote(idNote: number) {
    return this.notes.findIndex(note => note.id == idNote)
  }
}