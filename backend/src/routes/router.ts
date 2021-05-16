import { Router } from 'express';
import { Db } from '../database/Database';

const db = new Db();
const router = Router();

router.get('/', (req, res) => {
  res.send(db.notes);
});


export { router };