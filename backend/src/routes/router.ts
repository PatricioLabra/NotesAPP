import { Router } from 'express';
import { Db } from '../database/Database';
import { Note } from '../database/models/note';

const db = new Db();
const router = Router();

initResources();

router.get('/', (req, res) => {
  res.send('Welcome to notes API!');
});

router.get('/obtener_notas', (req, res) => {
  res.send(db.notes);
});

router.post('/agregar_nota', async (req, res) => {
  const newNote: Note = req.body as Note;

  if (!newNote.title || !newNote.description) {
    res.status(400);
    res.send({"error":"title not valid or description not valid", "title": newNote.title, "description": newNote.description});
    return ;
  }

  if (!validateState(newNote.state)) {
    res.status(400);
    res.send({"error": "state no valid", "state": newNote.state});
    return ;
  }

  const newId = db.addNote(newNote);
  await db.saveNotes();

  res.status(200);
  res.send({"new_id_created": newId});
});

router.post('/buscar_nota', (req, res) => {
  const idSearched: number = req.body.id;
  const noteSearched: Note | null = db.searchNote(idSearched);

  if (null == noteSearched) {
    res.status(404);
    res.send({"error": "note not found", "id": idSearched});
    return ;
  }

  res.status(200);
  res.send(noteSearched);
});

router.delete('/eliminar_nota', async (req, res) => {
  const idToDelete: number = req.body.id;

  if (!idToDelete) {
    res.status(400);
    res.send({"error": "id is not valid", "id": idToDelete});
    return ;
  }

  if (db.searchNote(idToDelete) == null) {
    res.status(404);
    res.send({"error": "note not found", "id": idToDelete});
    return ;
  }

  db.removeNote(idToDelete);
  await db.saveNotes();

  res.status(200);
  res.send(true);  
});

router.put('/modificar_nota', async (req, res) => {
  const updatedNote: Note = req.body;

  if (!updatedNote.title || !updatedNote.description) {
    res.status(400);
    res.send({"error":"title not valid or description not valid", "title": updatedNote.title, "description": updatedNote.description});
    return ;
  }
  
  if (!validateState(updatedNote.state)) {
    res.status(400);
    res.send({"error": "state not valid", "state": updatedNote.state});
    return ;
  }

  if (db.searchNote(updatedNote.id) == null) {
    res.status(404);
    res.send({"error": "note not found", "id": updatedNote.id});
    return ;
  }

  db.updateNote(updatedNote.id, updatedNote);
  await db.saveNotes();

  res.status(200);
  res.send(true);
});

export { router };

// Utils functions
async function initResources() {
  await db.loadNotes();
}

function validateState(state: string) {
  switch (state) {
    case 'process':
    case 'open':
    case 'close': return true;
    default : return false;
  }
}