import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import 'dotenv/config';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(pinoHttp());
app.use(helmet());
app.use(express.json());

// GET /notes
app.get('/notes', (req, res) => {
  res.status(200).json({ message: 'Retrieved all notes' });
});

// GET /notes/noteId
app.get('/notes/:noteId', (req, res) => {
  res
    .status(200)
    .json({ message: `Retrieved note with ID: ${req.params.noteId}` });
});

app.get('/test-error', (req, res) => {
  throw new Error('Simulated server error');
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// error middleware
app.use((err, req, res, next) => {
  const isProd = process.env.NODE_ENV === 'production';

  res.status(500).json({
    message: isProd ? 'Something went wrong' : err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
