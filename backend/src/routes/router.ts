import { Router } from 'express';
import { Db } from '../database/Database';
import { Note } from '../database/models/note';

const db = new Db();
const router = Router();

initResources();

router.get('/obtener_notas', (req, res) => {
  res.send(db.notes);
});

router.post('/agregar_nota', async (req, res) => {
  const newNote: Note = req.body as Note;
  let isValid = true;

  if (newNote.title && newNote.description) {
    const newId = db.addNote(newNote);

    switch (newNote.state) {
      case 'process':
      case 'open':
      case 'close': break;
      default : isValid = false; break;
    }

    if (isValid) {
      await db.saveNotes();

      res.status(200);
      res.send({"new_id_created": newId});
    } else {
      res.status(400);
      res.send({"error": "state no valid", "state": newNote.state});
    }
  } else {
    res.status(400);
    res.send({"error":"title not valid or description not valid", "title": newNote.title, "description": newNote.description});
  }
});

router.post('/buscar_nota', (req, res) => {
  const idSearched: number = req.body.id;
  const noteSearched: Note | null = db.searchNote(idSearched);

  if (noteSearched != null) {
    res.status(200);
    res.send(noteSearched);
  } else {
    res.status(404);
    res.send({"error": "note not found", "id": idSearched});
  }
});

router.delete('/eliminar_nota', async (req, res) => {
  const idDelete: number = req.body.id;

  if (idDelete != null) {
    if (db.searchNote(idDelete) != null) {
      db.removeNote(idDelete);
      await db.saveNotes();
      res.status(200);
      res.send(true);  
    } else {
      res.status(404);
      res.send({"error": "note not found", "id": idDelete});
    }
  } else {
    res.status(400);
    res.send({"error": "id is not valid", "id": idDelete});
  }
});

router.put('/modificar_nota', async (req, res) => {
  const updateNote: Note = req.body;
  let isValid = true;

  if (updateNote.title && updateNote.description) {
    switch (updateNote.state) {
      case 'process':
      case 'open':
      case 'close': break;
      default : isValid = false; break;
    }
  
    if (isValid ) {
      if (db.searchNote(updateNote.id) != null) {
        db.updateNote(updateNote.id, updateNote);
        await db.saveNotes();
  
        res.status(200);
        res.send(true);
      } else {
        res.status(404);
        res.send({"error": "note not found", "id": updateNote.id});
      }
    } else {
      res.status(400);
      res.send({"error": "state not valid", "state": updateNote.state});
    }  
  } else {
    res.status(400);
    res.send({"error":"title not valid or description not valid", "title": updateNote.title, "description": updateNote.description});
  }
});

export { router };

async function initResources() {
  await db.loadNotes();
}
