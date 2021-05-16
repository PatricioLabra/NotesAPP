import { Router } from 'express';
import { Db } from '../database/Database';
import { Note } from '../database/models/note';

const db = new Db();
const router = Router();

router.get('/', (req, res) => {
  res.send(db.notes);
});

router.post('/agregar_nota', (req, res) => {
  const newNote: Note = req.body as Note;
  const newId = db.addNote(newNote);

  res.status(200);
  res.send({"new_id_created": newId});
});

export { router };