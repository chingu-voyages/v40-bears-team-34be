import dotenv from 'dotenv';
dotenv.config({});
import express from 'express';
import cors from 'cors';
import { connectMongoAtlas } from './config/db.js';
import morgan from 'morgan';

connectMongoAtlas();

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the root route' });
});

const PORT = process.env.PORT || 5500;
const server = app.listen(PORT, () => {
  console.log(`The Local server is running on port ${PORT}`);
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error Occured : `, err.message);
  server.close(() => process.exit(1));
});