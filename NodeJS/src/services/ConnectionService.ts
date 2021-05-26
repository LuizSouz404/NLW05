import { getCustomRepository, Repository } from 'typeorm';
import { Connection } from '../models/Connection';
import { ConnectionRepository } from '../repositories/ConnectionRepository';

interface IConnectionCreate {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}

class ConnectionService {
  private connectionRepository: Repository<Connection>;

  constructor() {
    this.connectionRepository = getCustomRepository(ConnectionRepository);
  }

  async create({ socket_id, user_id, admin_id, id }: IConnectionCreate) {
    const connectionExists = await this.connectionRepository.findOne({
      where: { user_id },
    });

    if (connectionExists) {
      (connectionExists.socket_id = socket_id),
        await this.connectionRepository.save(connectionExists);

      return connectionExists;
    }

    const connection = this.connectionRepository.create({
      socket_id,
      user_id,
      admin_id,
      id,
    });

    await this.connectionRepository.save(connection);

    return connection;
  }

  async findByUserId(user_id: string) {
    const connection = await this.connectionRepository.findOne({ user_id });

    return connection;
  }

  async findAllWithoutAdmin() {
    const connections = await this.connectionRepository.find({
      where: { admin_id: null },
      relations: ['user'],
    });

    return connections;
  }

  async findBySocketID(socket_id: string) {
    const connection = await this.connectionRepository.findOne({
      socket_id,
    });

    return connection;
  }

  async updateAdminID(user_id: string, admin_id: string) {
    await this.connectionRepository
      .createQueryBuilder()
      .update(Connection)
      .set({ admin_id })
      .where('user_id = :user_id', {
        user_id,
      })
      .execute();
  }
}
export { ConnectionService };
