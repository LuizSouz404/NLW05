import { EntityRepository, Repository } from 'typeorm';
import { Message } from '../models/Message';

@EntityRepository(Message)
class MessageRepository extends Repository<Message> {}

export { MessageRepository };
