import e, { Request, Response } from 'express'
import { AuthRequest } from '../types/auth.types'
import {
    MenuService
} from '../services/menu.service'


const menuService = new MenuService()
export class MenuController {
    private cleanObject(obj: any): any {
        Object.keys(obj).forEach(key => {
            // Remove null, undefined and false values
            if (obj[key] === null || obj[key] === undefined || obj[key] === false) {
                delete obj[key];
            }
            // Clean nested objects
            else if (typeof obj[key] === 'object') {
                obj[key] = this.cleanObject(obj[key]);
                // Remove empty objects
                if (Object.keys(obj[key]).length === 0) {
                    delete obj[key];
                }
            }
        });
        return obj;
    }
    static async importMenuConfig(req: AuthRequest, res: Response) {
        const { menuConfig, menuType } = req.body;

        const result = await menuService.importMenuConfig(menuConfig, menuType);
        res.json(result);
    }
    static async getMenuStructure(req: AuthRequest, res: Response) {
        const { menuType } = req.body;
        const result = await menuService.getMenuStructure(menuType);
        
        res.json(result);
    }
    static async convert(req: Request, res: Response) {
        const result = await menuService.import();
        if (!result) {
            res.status(500).json({ message: 'Failed to convert menu' });
        }
        else
            res.json(result);

    }

}

