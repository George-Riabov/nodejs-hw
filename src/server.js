import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connectMongoDB } from './db/connectMongoDB.js';
import notesRoutes from './routes/notesRoutes.js';
import 'dotenv/config';
import { logger } from './middleware/logger.js';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(logger);
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(notesRoutes);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
