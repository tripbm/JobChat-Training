import BaseRepo from './BaseRepo';
import Message from '../../models/message';
import GroupMessage from '../../models/groupMessage';

const MESSAGE_ADDED = 'messageAdded';
class MessageRepo extends BaseRepo {
  constructor() {
    super();
    this.model = Message;
  }

  async getAll({ page, limit }) {
    try {
      const responses = await this.model
        .find()
        .skip(page)
        .limit(limit);
      return responses;
    } catch (error) {
      throw error;
    }
  }
  async getGroupChat({ page, limit }) {
    try {
      const responses = await GroupMessage.find()
        .skip(page)
        .limit(limit);
      return responses;
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

  async createGroupChat(data) {
    try {
      const responses = await new GroupMessage(data.data).save();
      let results = {
        message: 'Create group chat false',
        error: 1,
      };

      if (responses) {
        results = {
          message: 'Create group chat success',
          error: 0,
        };
      }

      return results;
    } catch (error) {
      throw error;
    }
  }
}

export default MessageRepo;
