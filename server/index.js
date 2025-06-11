import express from 'express';
import roomsRouter from './api/rooms.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/rooms', roomsRouter);

app.listen(443, () => {
  console.log('API server listening on http://localhost:443');
  console.log('DB_HOST:',process.env.DB_HOST)
});
