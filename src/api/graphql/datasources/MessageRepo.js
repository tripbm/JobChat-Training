import BaseRepo from './BaseRepo';
import Message from '../../models/message';
import GroupChat from '../../models/groupChat';

const MESSAGE_ADDED = 'messageAdded';
class MessageRepo extends BaseRepo {
  constructor() {
    super();
    this.model = Message;
  }

  async getAll({ page, limit }) {
    try {
      return this.model
        .find()
        .skip(page)
        .limit(limit);
    } catch (error) {
      throw error;
    }
  }

  async addMessage(args, context) {
    try {
      const message = await this.model.create(args);
      context.pubsub.publish(MESSAGE_ADDED, { messageAdded: message });
      return message;
    } catch (error) {
      throw error;
    }
  }
}

export default MessageRepo;
