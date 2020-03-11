export default {
  Query: {
    listGroupChatById: async (root, args, context) => {
      const { user } = context.req;
      return context.groupChat.listGroupChatById(user.userId);
    },
  },
  Mutation: {
    createGroupChat: async (root, args, context) => {
      const { data } = args;
      const { user } = context.req;
      return context.groupChat.createGroupChat(user, data);
    },
    deleteGroupChat: async (root, args, context) => {
      const { user } = context.req;
      const { groupChatId } = args;
      return context.groupChat.deleteGroupChat(user, groupChatId);
    },
    leaveGroupChat: async (root, args, context) => {
      const { user } = context.req;
      const { groupChatId } = args;
      return context.groupChat.leaveGroupChat(user, groupChatId);
    },
    addMemberGroupChat: async (root, args, context) => {
      const { memberId, role, groupChatId } = args;
      const { user } = context.req;
      return context.groupChat.addMemberGroupChat(user, memberId, role, groupChatId);
    },
  },
};
