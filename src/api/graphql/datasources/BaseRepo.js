export default class BaseRepo {
  async getAll({ page, limit }) {
    try {
      const responses = await this.find()
        .skip(page)
        .limit(limit);
      return responses;
    } catch (error) {
      throw error;
    }
  }
}
