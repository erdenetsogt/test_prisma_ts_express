import { Router } from 'express';
import { PeopleController } from '../controllers/people.controller';
import { AuthMiddleware } from '../middleware/auth.middleware';
const auth = new AuthMiddleware();


const router = Router();

router.get('/main', PeopleController.getAll);
router.get('/main/:id', PeopleController.getById);
router.post('/main', PeopleController.create);
router.put('/main/:id', PeopleController.update);

//peopleRouter.delete('/main/:id', PeopleController.delete);
//peopleRouter.get('/:id/education', PeopleController.getEducation);
//peopleRouter.post('/main/bulk', PeopleController.bulkCreate);

export const peopleRouter = router;

