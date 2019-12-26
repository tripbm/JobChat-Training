import BaseRepo from './BaseRepo';
import GroupChatRepo from './GroupChatRepo';
import UserRepo from './UserRepo';
import Relationship from '../../models/relationship';

const ADD_FRIEND = 'AddFriend';
class RelationshipRepo extends BaseRepo {
  constructor() {
    super();
    this.model = Relationship;
    this.GroupChatRepo = new GroupChatRepo();
    this.UserRepo = new UserRepo();
  }

  async getlistFriend(userId) {
    try {
      return this.model.find({ userReceiveId: userId });
    } catch (error) {
      throw error;
    }
  }

  async addFriend(pubsub, user, userReceiveId) {
    try {
      if (!user) throw Error('Not user exist!');
      if (user.userId === userReceiveId) throw Error(`You can't send request you!`);
      const checkRelationship = await this.model.findOne({
        userReceiveId: userReceiveId,
        userSendId: user.userId,
      });
      if (checkRelationship) throw Error('You sended relationship!');
      const checkFriend = await this.GroupChatRepo.checkFriend(userReceiveId, user.userId);
      if (checkFriend) throw Error('You was friend!');
      const relationship = await this.model.create({
        userReceiveId: userReceiveId,
        userSendId: user.userId,
      });
      pubsub.publish(ADD_FRIEND, { addFriend: relationship });
      return relationship;
    } catch (error) {
      throw error;
    }
  }

  async acceptFriend(pubsub, user, userSendId) {
    try {
      if (!user) throw Error('Not user exist!');
      let relationship = await this.model.findOne({
        userReceiveId: user.userId,
        userSendId: userSendId,
      });
      if (!relationship) throw Error('No request friend!');

      const userSend = await this.UserRepo.getUserById(userSendId);
      const members = [
        {
          userId: userSend._id,
          userName: userSend.userName,
          role: 'member',
        },
        {
          userId: user.userId,
          userName: user.userName,
          role: 'member',
        },
      ];
      const friend = {
        name: `${userSend.userName}_${user.userName}`,
        members: members,
        type: 'private',
      };
      await this.GroupChatRepo.addFriend(friend);
      const deleteResult = await this.model.deleteOne({
        userReceiveId: user.userId,
        userSendId: userSendId,
      });
      relationship = { userReceiveId: user.userId, userSendId: userSendId };
      if (deleteResult) {
        pubsub.publish(ADD_FRIEND, { acceptFriend: relationship });
        return relationship;
      }
      return { userReceiveId: null, userSendId: null };
    } catch (error) {
      throw error;
    }
  }
}

export default RelationshipRepo;
