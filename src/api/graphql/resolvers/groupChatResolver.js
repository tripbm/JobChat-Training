import { withFilter } from 'apollo-server';
const MESSAGE_ADDED = 'messageAdded';

export default {
  Subscription: {
    messageAdded: {
      subscribe: withFilter(
        (payload, args, ctx) => {
          return ctx.pubsub.asyncIterator(MESSAGE_ADDED);
        },
        (payload, args, ctx) => {
          return payload.messageAdded.groupId === args.groupId;
        },
      ),
    },
  },
  Query: {
    listGroupChats: async (root, args, context) => {
      const { page, limit } = args;
      return context.groupChat.getGroupChat({ page, limit });
    },
  },
  Mutation: {
    createGroupChat: async (root, args, context) => {
      return context.groupChat.createGroupChat(args);
    },
  },
};
