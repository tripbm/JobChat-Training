import { withFilter } from 'apollo-server';
const MESSAGE_ADDED = 'addedMessage';

export default {
  Subscription: {
    addedMessage: {
      subscribe: withFilter(
        (payload, args, ctx) => {
          return ctx.pubsub.asyncIterator(MESSAGE_ADDED);
        },
        (payload, args, ctx) => {
          return payload.addedMessage.groupId === args.groupId;
        },
      ),
    },
    editMessage: {
      subscribe: withFilter(
        (payload, args, ctx) => {
          return ctx.pubsub.asyncIterator(MESSAGE_ADDED);
        },
        (payload, args, ctx) => {
          return payload.editMessage.groupId === args.groupId;
        },
      ),
    },
  },
  Query: {
    messages: async (root, args, context) => {
      const { page, limit } = args;
      return context.message.getAll({ page, limit });
    },
  },
  Mutation: {
    addMessage: async (root, args, context) => {
      const { user } = context.req;
      const { content, groupId } = args;
      const { pubsub } = context;
      return context.message.addMessage(pubsub, user, content, groupId);
    },
    editMessage: async (root, args, context) => {
      const { user } = context.req;
      const { content, groupId, messageId } = args;
      const { pubsub } = context;
      return context.message.addMessage(pubsub, user, content, groupId, messageId);
    },
  },
};
