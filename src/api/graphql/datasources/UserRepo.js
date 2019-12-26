import BaseRepo from './BaseRepo';
import User from '../../models/user';
import auth from '../../../utils/authenHelp';
import hashPass from '../../../utils/hashPass';
class userRepo extends BaseRepo {
  constructor() {
    super();
    this.model = User;
  }
  async loginUser(userName, password) {
    try {
      const user = await this.model.findOne({ userName: userName });
      if (!user) throw Error('Not user');
      const hash = await hashPass.compare(password, user.password);
      let token = null;
      if (hash) {
        const payload = {
          userId: user._id,
          userName: user.userName,
          role: user.role,
        };
        token = await auth.setToken(payload);
      }
      return token.token;
    } catch (error) {
      throw error;
    }
  }

  /**
   * function get user
   * @param {Object} data
   */
  async registerUser(data) {
    try {
      const user = await this.model.findOne({ userName: data.userName });
      if (user) throw Error('User is exist');
      return this.model.create(data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {Object} data
   */
  async updateProfile(user, data) {
    try {
      const myProfile = await this.model.findOne({ _id: user.userId });
      if (!myProfile) throw Error('User not exist!');
      const checPassword = await hashPass.compare(data.password, myProfile.password);
      if (!checPassword) throw Error('Password wrong!');
      data.password = await hashPass.hash(data.password);
      if (data.newPassword) {
        const password = hashPass.hash(data.newPassword);
        data.password = password;
      }
      const updateResults = await this.model.updateOne({ _id: myProfile._id }, data);
      if (!updateResults) throw Error('Update false');
      return this.model.findOne({ _id: user.userId });
    } catch (error) {
      throw error;
    }
  }

  /**
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
   * @param {Number} id
   */
  async getUserById(id) {
    try {
      return this.model.findOne({ _id: id });
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {Number} id
   */
  async getProfile(user) {
    try {
      if (!user) throw Error('User not exist');
      return this.model.findOne({ _id: user.userId });
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {Number} id
   */
  async getOtherProfile(userId) {
    try {
      return this.model.findOne({ _id: userId });
    } catch (error) {
      throw error;
    }
  }
  /**
   * @param {Array} ids
   */
  async getUserByIds(ids) {
    try {
      return this.model.find({ _id: ids });
    } catch (error) {
      throw error;
    }
  }

  /**
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
