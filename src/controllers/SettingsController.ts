import { Request, Response } from 'express';
import { SettingsService } from '../services/SettingsService';

class SettingsController {
  async create(request: Request, response: Response) {
    const { chat, username } = request.body;

    const settingsServices = new SettingsService();

    try {
      const settings = await settingsServices.create({ chat, username });

      return response.json(settings).status(200);
    } catch (err) {
      return response.status(400).json({
        error: err.message,
      });
    }
  }

  async findByUsername(request: Request, response: Response) {
    const { username } = request.params;

    const settingsService = new SettingsService();

    const settings = await settingsService.findByUsername(username);

    return response.json(settings);
  }

  async update(request: Request, response: Response) {
    const { username } = request.params;
    const { chat } = request.body;

    const settingsService = new SettingsService();

    const settings = await settingsService.update(username, chat);

    return response.json({
      settings,
      message: 'alterado',
    });
  }
}

export { SettingsController };
