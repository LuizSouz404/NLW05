import { getCustomRepository, Repository } from 'typeorm';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UsersRepository';

interface IUserService {
  email: string;
}

class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  async create({ email }: IUserService) {
    const userExists = await this.userRepository.findOne({ email });

    if (userExists) return userExists;

    const user = this.userRepository.create({
      email,
    });

    await this.userRepository.save(user);

    return user;
  }

  async findByEmail({ email }: IUserService) {
    const user = await this.userRepository.findOne(email);

    return user;
  }
}

export { UserService };
