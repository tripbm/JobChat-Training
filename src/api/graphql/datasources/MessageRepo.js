import BaseRepo from './BaseRepo';
import Message from '../../models/message';
import GroupChatRepo from './GroupChatRepo';
const MESSAGE_ADDED = 'addedMessage';
class MessageRepo extends BaseRepo {
  constructor() {
    super();
    this.model = Message;
    this.GroupRepo = new GroupChatRepo();
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

  async addMessage(pubsub, user, content, groupId) {
    try {
      if (!(user && content && groupId)) throw Error('Send message false');
      const permisionUser = await this.GroupRepo.getGroupById(user.userId, groupId);
      if (!permisionUser) throw Error('You do not have permission to send messages!');
      let message = {
        content,
        userId: user.userId,
        groupId,
      };
      message = await this.model.create(message);
      pubsub.publish(MESSAGE_ADDED, { addedMessage: message });
      return message;
    } catch (error) {
      throw error;
    }
  }

  async editMessage(pubsub, user, content, groupId, messageId) {
    try {
      if (!(user && content && groupId)) throw Error('Send message false');
      const permisionUser = await this.GroupRepo.getGroupById(user.userId, groupId);
      if (permisionUser) throw Error('You do not have permission to edit messages!');

      let message = await this.model.find({ _id: messageId, groupId: groupId });
      if (!message) throw Error('Do not message to edit!');
      message.content = content;
      await this.model.updateOne({ _id: messageId }, { content: content });
      pubsub.publish(MESSAGE_ADDED, { editMessage: message });
      return message;
    } catch (error) {
      throw error;
    }
  }
}

export default MessageRepo;
