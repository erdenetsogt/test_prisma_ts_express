import experss from 'express';
import {MenuController} from '../controllers/menu.controller';
import {AuthMiddleware} from '../middleware/auth.middleware';



const router = experss.Router();

router.post('/',AuthMiddleware.verifyToken, MenuController.importMenuConfig);
router.get('/:menu_type',AuthMiddleware.verifyToken, MenuController.getMenuStructure);
router.get('/',AuthMiddleware.verifyToken, MenuController.getMenuItems);
//router.get('/:menuType',AuthMiddleware.verifyToken, MenuController.convert);

export const menuRouter = router;