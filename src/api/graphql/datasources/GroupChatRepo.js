import BaseRepo from './BaseRepo';
import GroupChat from '../../models/groupChat';

class GroupChatRepo extends BaseRepo {
  constructor() {
    super();
    this.model = GroupChat;
  }

  async getGroupChat({ page, limit }) {
    try {
      return this.model
        .find()
        .skip(page)
        .limit(limit);
    } catch (error) {
      throw error;
    }
  }

  async createGroupChat(data) {
    try {
      const createResult = await new this.model(data.data).save();
      let results = {
        message: 'Create group chat false',
        error: 1,
      };
      if (createResult) {
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

export default GroupChatRepo;
