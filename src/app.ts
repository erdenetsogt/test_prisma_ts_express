import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth.routes'
import { peopleRouter } from './routes/poeple.routes';
import { measurementRouter } from './routes/measurment.routes';
import { employeeRouter } from './routes/employee.routes';
import { valueRouter } from './routes/value.routes';
import bodyParser from 'body-parser'
dotenv.config();
const router = express.Router();
const app: Express = express();
const port = process.env.PORT || 5000;


app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//app.use(cors());
router.use('/user', authRouter);
router.use('/hr/people', peopleRouter);
router.use('/m', measurementRouter);
router.use('/company', employeeRouter);
//router.use('/value', valueRouter);
app.use(router);

// Test route
app.post('/test', express.json(), (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 