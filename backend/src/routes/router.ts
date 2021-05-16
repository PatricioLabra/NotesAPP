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

router.delete('/eliminar_nota', (req, res)=>{
  const idDelete:number = req.body.id;

  if (idDelete != null) {
    if(db.searchNote(idDelete)!= null){
      db.removeNote(idDelete);
      res.status(200);
      res.send(true);  //le agregué ese true para el postman, ya que no me mandaba nada de vuelta y se quedaba buscando respuesta. Si quieres, lo dejamos.
    }else{
      res.status(404);
      res.send({"error": "note not found", "id": idDelete});
    }
  }else{
    res.status(400);
    res.send({"error": "id no valid", "id": idDelete});
  }
});
export { router };