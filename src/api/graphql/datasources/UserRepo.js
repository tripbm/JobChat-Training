import BaseRepo from './BaseRepo';
import User from '../../models/user';

class userRepo extends BaseRepo {
  constructor() {
    super();
    this.model = User;
  }
  /**
   * function get user
   * @param {Object} data
   */
  async createUser(data) {
    try {
      let results = {
        error: 1,
        message: 'Create user false',
      };
      const userResults = await this.model.create(data);
      if (userResults) {
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
   * @param {Object} data
   */
  async updateUser(userId, data) {
    try {
      let results = {
        error: 1,
        message: 'Update user false',
      };
      const updateResults = await this.model.updateOne({ _id: userId }, data);
      if (updateResults)
        results = {
          error: 0,
          message: 'Update success',
        };
      return results;
    } catch (error) {
      throw error;
    }
  }
  /**
   *
   * @param {Number} id
   */
  async deleteUser({ id }) {
    try {
      let results = {
        error: 1,
        message: 'Delete user false',
      };
      const deleteResult = await this.model.deleteOne({ _id: id });
      if (deleteResult.n === 1)
        results = {
          error: 0,
          message: 'Delete user success',
        };
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
      return this.model.findOne({ _id: id });
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
