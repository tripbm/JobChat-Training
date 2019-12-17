// import  { pubsub } from '../../../../app'
import { withFilter } from 'apollo-server'
const MESSAGE_ADDED = "messageAdded"

export default {
  Subscription: {
    messageAdded: {
      subscribe: withFilter(
        (payload, args, ctx) => {
          return ctx.pubsub.asyncIterator(MESSAGE_ADDED,)
        },
        (payload, args, ctx) => {
          return payload.messageAdded.groupId === args.groupId;
        }
      ),
    },
  },
  Query: {
    messages: async (root, args, context) => {
      const { page, limit } = args;
      return context.message.getAll({ page, limit });
    },
    listGroupChats: async (root, args, context) => {
      const { page, limit } = args;
      return context.message.getGroupChat({ page, limit });
    }
  },
  Mutation: {
    addMessage: async (root, args, context) => {
      return context.message.addMessage(args, context);
    },

    createGroupChat: async (root, args, context) => {
      return context.message.createGroupChat(args);
    }
  },
};