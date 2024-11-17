import { Router } from 'express';
import { PeopleController } from '../controllers/people.controller';
export const peopleRouter = Router();

peopleRouter.get('/main', PeopleController.list);
peopleRouter.get('/main/:id', PeopleController.getById);
peopleRouter.post('/main', PeopleController.create);
peopleRouter.put('/main/:id', PeopleController.update);
peopleRouter.delete('/main/:id', PeopleController.delete);
peopleRouter.get('/:id/education', PeopleController.getEducation);
peopleRouter.post('/main/bulk', PeopleController.bulkCreate);

export default peopleRouter;

