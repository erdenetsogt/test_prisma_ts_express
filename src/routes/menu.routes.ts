import experss from 'express';
import {MenuController} from '../controllers/menu.controller';
import {AuthMiddleware} from '../middleware/auth.middleware';



const router = experss.Router();

router.post('/',AuthMiddleware.verifyToken, MenuController.importMenuConfig);
router.get('/',AuthMiddleware.verifyToken, MenuController.getMenuStructure);
router.get('/convert',AuthMiddleware.verifyToken, MenuController.convert);

export const menuRouter = router;