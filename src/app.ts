import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {authRouter} from './routes/auth.routes'
import  peopleRouter  from './routes/poeple.routes';
import bodyParser from 'body-parser'
dotenv.config();
const router = express.Router();
const app: Express = express();
const port = process.env.PORT || 5000;

var options = {
  inflate:true,
  limit: '100kb',
  type: 'application/json'
}


//app.use(bodyParser.raw(options));
//app.use(bodyParser.json({ verify: (req, res, buf) => req.rawBody = buf }))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));

//app.use(cors());
router.use('/user', authRouter);
router.use('/hr/people', peopleRouter);
app.use(router);

// Test route
app.post('/test',express.json(), (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 