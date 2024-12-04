import routes from "express"
import { ValueController } from "../controllers/value.controller";
const router = routes.Router();
//const valueController = new ValueController();
router.post('/value', ValueController.createValue);
router.get('/value', ValueController.getAllValue);


export const valueRouter = router;