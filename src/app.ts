import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import userRouter from './routes/user.routes'
dotenv.config();
const router = express.Router();
const app: Express = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

router.use('/users', userRouter);
app.use(router);

// Test route


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 