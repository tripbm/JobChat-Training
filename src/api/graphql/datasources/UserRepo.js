import BaseRepo from './BaseRepo';
import User from '../../models/user';

class userRepo extends BaseRepo {
  constructor() {
    super();
    this.model = User;
  }
  /**
   * function get user
   * @param {number} id
   */
  async createUser(data) {
    try {
      let results = {
        error: 1,
        message: 'Create user false',
      };
      const responses = await this.model.create(data);
      if (responses) {
        results = {
          error: 0,
          message: 'Create user success',
        };
        return results;
      }
      return results;
    } catch (error) {
      throw error;
    }
  }
  /**
   *
   * @param {Number} id
   */
  async getUserById({ id }) {
    try {
      return this.model.findOne({ userId: id });
    } catch (error) {
      throw error;
    }
  }
  /**
   *
   * @param {String} username
   */
  async getAll(page, limit) {
    try {
      return this.model
        .find()
        .skip(page)
        .limit(limit);
    } catch (error) {
      throw error;
    }
  }
  async loginUserName({ username }) {
    try {
      return this.model.findOne({ userName: username });
    } catch (error) {
      throw error;
    }
  }
}

export default userRepo;
