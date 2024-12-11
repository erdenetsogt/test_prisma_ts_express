import e, { Request, Response } from 'express'
import { AuthRequest } from '../types/auth.types'
import {
    MenuService
} from '../services/menu.service'


const menuService = new MenuService()
export class MenuController {
/// id, typeMenu delete null undefined false utgiig ustgana
    
    static async importMenuConfig(req: AuthRequest, res: Response) {
        const { menuConfig, menuType } = req.body;

        const result = await menuService.importMenuConfig(menuConfig, menuType);
        res.json(result);
    }
    static async getMenuStructure(req: Request, res: Response) {
        const { menu_type } = req.params;
        if (menu_type === "SIDEBAR" || menu_type === "MEGA" || menu_type === "ROOT") {
            const result = await menuService.getMenuStructure(menu_type);
            res.json(result);
        } else {
            res.status(400).json({ message: 'Invalid menu type' }); // Handle the case when menuType is not one of the expected values
        }
    }
    static async getMenuItems(req: Request, res: Response) {
        
        const result = await menuService.menuItem()
        res.json(result);
    }
    

}

