import { Router } from 'express';
import { MessageController } from './controllers/MessageController';
import { SettingsController } from './controllers/SettingsController';
import { UserController } from './controllers/UserController';

const router = Router();

const settingController = new SettingsController();
const userController = new UserController();
const messageController = new MessageController();

router.post('/settings', settingController.create);
router.get('/settings/:username', settingController.findByUsername);
router.put('/settings/:username', settingController.update);

router.post('/users', userController.create);

router.post('/messages', messageController.create);
router.get('/messages/:id', messageController.showByUser);

export { router };
