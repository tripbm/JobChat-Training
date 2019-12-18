import { LIMIT } from '../../../config/index';
export default class baseRepo {
  async getAll({ page = 0, limit = LIMIT }) {
    try {
      const responses = await this.find()
        .skip(page)
        .limit(limit);
      return responses;
    } catch (error) {
      console.log(error);
    }
  }
}
