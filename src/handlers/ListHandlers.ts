import { Request, Response } from 'express';
import { ListService } from '../services/ListService';

const listService = new ListService();

class ListHandler {
  async getList(req: Request, res: Response): Promise<void> {
    try {
      const list = await listService.findList(req.query);
      res.status(200).json(list);
    } catch (error: any) {
      res.status(error.statusCode ?? 500).json({
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  }

  async addToList(req: Request, res: Response): Promise<void> {
    try {
      const list = await listService.addToList(req.body);
      res.status(201).json(list);
    } catch (error: any) {
      res.status(error.statusCode ?? 500).json({
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  }

  async deleteFromList(req: Request, res: Response): Promise<void> {
    try {
      await listService.deleteFromList(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(error.statusCode ?? 500).json({
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  }
}

export { ListHandler };
