
import { PrismaClient, MenuItem } from '@prisma/client';
import { MENU_SIDEBAR, MENU_MEGA, MENU_ROOT } from '../config/menu.config';
const prisma = new PrismaClient();

export class MenuService {

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
  async importMenuConfig(menuConfig: any[], menuType: 'SIDEBAR' | 'MEGA' | 'ROOT') {
    try {
      const processMenuItem = async (item: any, parentId?: number) => {
        const menuItem = await prisma.menuItem.create({
          data: {
            title: item.title,
            icon: item.icon,
            path: item.path,
            heading: item.heading,
            disabled: item.disabled || false,
            collapse: item.collapse || false,
            collapseTitle: item.collapseTitle,
            expandTitle: item.expandTitle,
            menuType: menuType,
            parentId: parentId,
          }
        });

        if (item.children?.length > 0) {
          for (const child of item.children) {
            await processMenuItem(child, menuItem.id);
          }
        }
      };

      for (const item of menuConfig) {
        await processMenuItem(item);
      }

      return true;
    } catch (error) {
      console.error('Failed to import menu config:', error);
      throw error;
    }
  }

  async import() {
    try {
      await this.importMenuConfig(MENU_SIDEBAR, 'SIDEBAR');
      await this.importMenuConfig(MENU_MEGA, 'MEGA');
      await this.importMenuConfig(MENU_ROOT, 'ROOT');
      return true;
    } catch (error) {
      console.error('Failed to get all menu items:', error);
      throw error;
    }
  }

  async getMenuStructure(menuType: 'SIDEBAR' | 'MEGA' | 'ROOT') {
    try {
      const menuItems = await prisma.menuItem.findMany({
        where: {
          menuType: menuType,
          parentId: null
        },
        include: {
          children: {
            include: {
              children: {
                include: {
                  children: true
                }
              }
            }
          }
        }
      });
      if (menuItems.length >0) {
        //console.log(menuItems)
        return this.cleanObject(menuItems);
      }
      else {
        return menuItems;
      }
    } catch (error) {
      console.error('Failed to get menu structure:', error);
      throw error;
    }
  }
}