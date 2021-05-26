import { getCustomRepository, Repository } from 'typeorm';
import { Setting } from '../models/Setting';
import { SettingRepository } from '../repositories/SettingsRepository';

interface IServiceCreate {
  chat: boolean;
  username: string;
}

class SettingsService {
  private settingsRepository: Repository<Setting>;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingRepository);
  }

  async create({ chat, username }: IServiceCreate) {
    const userExists = await this.settingsRepository.findOne({ username });

    if (userExists) throw new Error('User already exists.');

    const settings = this.settingsRepository.create({
      chat,
      username,
    });

    await this.settingsRepository.save(settings);

    return settings;
  }

  async findByUsername(username: string) {
    const settings = await this.settingsRepository.findOne({
      username,
    });

    return settings;
  }

  async update(username: string, chat: boolean) {
    await this.settingsRepository
      .createQueryBuilder()
      .update(Setting)
      .set({ chat })
      .where('username = :username', {
        username,
      })
      .execute();
  }
}

export { SettingsService };
