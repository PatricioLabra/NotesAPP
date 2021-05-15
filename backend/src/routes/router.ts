import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send({'Title': 'nota1'});
});

export { router };