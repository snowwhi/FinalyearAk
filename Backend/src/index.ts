import express, { type Request, type Response, type Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './connections/connectToDB.js';
import { Middleware } from './middlewares/middleware.js';
import route from './router/route.js';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'https://finalyear-ak.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(Middleware);
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

const startServer = async () => {
  try {
    await connectDB();
    console.log('✅ MySQL Connection initialized');

    app.get('/', (req: Request, res: Response) => {
      res.json({ message: 'Result Management System API is active Chill Ayesha i am fine' });
    });

    app.use('/api', route);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
