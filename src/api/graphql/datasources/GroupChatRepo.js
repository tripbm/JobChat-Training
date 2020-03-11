import BaseRepo from './BaseRepo';
import UserRepo from './UserRepo';
import GroupChat from '../../models/groupChat';

class GroupChatRepo extends BaseRepo {
  constructor() {
    super();
    this.model = GroupChat;
    this.UserRepo = new UserRepo();
  }

  async listGroupChatById(userId) {
    try {
      return this.model.find({ 'members.userId': userId });
    } catch (error) {
      throw error;
    }
  }

  async createGroupChat(user, data) {
    try {
      if (!user) throw new Error('Not user login!');
      let member = {
        userId: user.userId,
        userName: user.userName,
        role: 'admin',
      };
      let members = data.members;
      members = [member, ...members];
      data.members = members;
      data.type = 'group';
      return this.model(data).save();
    } catch (error) {
      throw error;
    }
  }

  async addMemberGroupChat(user, memberId, role, groupChatId) {
    try {
      if (!user) throw Error('Not user login!');
      const groupChat = await this.model.findOne({
        'members.userId': user.userId,
        _id: groupChatId,
      });
      if (!groupChat) throw Error('Not groupChat exist!');
      const checkPermision = groupChat.members.filter(member => member.userId === user.userId);
      if (!checkPermision[0].role === 'admin') role = 'member';
      const checkMemberExist = groupChat.members.filter(member => member.userId === memberId);

      if (checkMemberExist[0]) throw Error('Member exist in group!');
      const memberInfo = await this.UserRepo.getUserById({ _id: memberId });
      let members = groupChat.members;
      const member = {
        userId: memberInfo._id,
        userName: memberInfo.userName,
        role: role,
      };
      members = [...members, member];
      await this.model.updateOne({ _id: groupChat._id }, { members: members });
      return { message: 'Add member success!', error: 0 };
    } catch (error) {
      throw error;
    }
  }

  async deleteGroupChat(user, groupChatId) {
    try {
      if (!user) throw Error('Not user login!');
      const groupChat = await this.model.findOne({
        'members.userId': user.userId,
        _id: groupChatId,
      });
      if (!groupChat) throw Error('Not groupChat exist!');
      const member = groupChat.members.filter(member => member.userId === user.userId);
      if (!member[0].role === 'admin') throw Error('User not permision!');
      const deleteResult = await this.model.deleteOne({ _id: groupChatId });
      if (deleteResult)
        return {
          message: 'Delete success!',
          error: 0,
        };
      return {
        message: 'Delete false',
        error: 1,
      };
    } catch (error) {
      throw error;
    }
  }

  async leaveGroupChat(user, groupChatId) {
    try {
      if (!user) throw Error('Not user login!');
      const groupChat = await this.model.findOne({
        'members.userId': user.userId,
        _id: groupChatId,
      });
      if (!groupChat) throw Error('Not groupChat exist!');
      const member = groupChat.members.filter(member => member.userId === user.userId);
      if (member[0].role === 'admin') throw Error('Your are admin group!');
      const members = groupChat.members.filter(member => member.userId !== user.userId);
      await this.model.updateOne({ _id: groupChat._id }, { members: members });
      return { message: 'Leave group success', error: 0 };
    } catch (error) {
      throw error;
    }
  }

  async addFriend(friend) {
    try {
      return await this.model.create(friend);
    } catch (error) {
      throw error;
    }
  }

  async checkFriend(userReceiveId, userSendId) {
    try {
      const members = [userReceiveId, userSendId];
      const checkFriend = await this.model.find({ 'members.userId': members }, { type: 'private' });
      if (checkFriend.length === 0) return false;
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getGroupById(memberId, groupChatId) {
    try {
      const groupChat = await this.model.findOne(
        { _id: groupChatId },
        { 'members.userId': memberId },
      );
      if (!groupChat) return false;
      return true;
    } catch (error) {
      throw error;
    }
  }
}

export default GroupChatRepo;
