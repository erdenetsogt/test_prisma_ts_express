import { Router } from 'express';
import { PeopleController } from '../controllers/people.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';
const auth = new AuthMiddleware();


const peopleRouter = Router();

peopleRouter.get('/main', PeopleController.getAll);
peopleRouter.get('/main/:id', PeopleController.getById);
peopleRouter.post('/main', PeopleController.create);
peopleRouter.put('/main/:id', PeopleController.update);
peopleRouter.post('/main/test', PeopleController.test);
//peopleRouter.delete('/main/:id', PeopleController.delete);
//peopleRouter.get('/:id/education', PeopleController.getEducation);
//peopleRouter.post('/main/bulk', PeopleController.bulkCreate);

export default peopleRouter;

