import { Request, Response } from 'express';
import { MessageService } from '../services/MessageService';

class MessageController {
  async create(request: Request, response: Response): Promise<Response> {
    const { admin_id, user_id, text } = request.body;

    const messageService = new MessageService();

    const message = await messageService.create({ admin_id, user_id, text });

    return response.status(200).json(message);
  }

  async showByUser(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const messageService = new MessageService();

    const list = await messageService.lisByUser(id);

    return response.status(200).json({
      list,
    });
  }
}

export { MessageController };
