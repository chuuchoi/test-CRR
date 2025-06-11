import express from 'express';
import { pool } from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const [rooms] = await pool.execute('SELECT * FROM rooms');
  res.json(rooms);
});

export default router;
