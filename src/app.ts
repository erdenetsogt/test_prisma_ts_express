import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {authRouter} from './routes/auth.routes'
//import { peopleRouter } from './routes/poeple.routes';
dotenv.config();
const router = express.Router();
const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
router.use('/user', authRouter);
//router.use('/hr/people', peopleRouter);
app.use(router);

// Test route
app.get('/test', (req, res) => {
  res.json({
    status: 'success',
    message: 'Server is running properly',
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 