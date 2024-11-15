import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';

export class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const { email, name } = req.body;
      const user = await UserModel.create({ email, name });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users' });
    }
  }
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findByEmailPassword(email, password);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json(user);
    } catch (error) {
      
    }
  }
  static async getUserById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching user' });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { email, name } = req.body;
      const user = await UserModel.update(id, { email, name });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error updating user' });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await UserModel.delete(id);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting user' });
    }
  }
}