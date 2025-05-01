import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'API is running' });
});

app.get('/api/status', (_req: Request, res: Response) => {
  res.json({ 
    status: 'operational',
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development'
  });
});

export default app;