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
  let isValid = true;

  switch (newNote.state) {
    case 'process':
    case 'open':
    case 'close': break;
    default : isValid = false; break;
  }

  if (isValid) {
    res.status(200);
    res.send({"new_id_created": newId});
  } else {
    res.status(400);
    res.send({"error": "state no valid", "state": newNote.state});
  }

});

export { router };