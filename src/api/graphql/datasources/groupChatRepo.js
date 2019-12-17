import baseRepo from './baseRepo';
import GroupMessage from '../../models/groupMessage';

class messageRepo extends baseRepo {
  constructor() {
    super();
    this.model = GroupMessage;
  }

  async getGroupChat({ page = 0, limit = LIMIT }) {
    try {
      const responses = await this.model
        .find()
        .skip(page)
        .limit(limit);
      return responses;
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  }
}

export default messageRepo;
