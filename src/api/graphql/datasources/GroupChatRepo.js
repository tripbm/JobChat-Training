import BaseRepo from './BaseRepo';
import GroupMessage from '../../models/groupMessage';

class MessageRepo extends BaseRepo {
  constructor() {
    super();
    this.model = GroupMessage;
  }
  async getGroupChat({ page, limit }) {
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
  async createGroupChat(data) {
    try {
      const responses = await new this.model(data.data).save();
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
