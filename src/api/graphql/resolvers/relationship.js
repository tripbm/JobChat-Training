import { withFilter } from 'apollo-server';
const ADD_FRIEND = 'AddFriend';

export default {
  Subscription: {
    addFriend: {
      subscribe: withFilter(
        (payload, args, ctx) => {
          return ctx.pubsub.asyncIterator(ADD_FRIEND);
        },
        (payload, args, ctx) => {
          return payload.addFriend.userReceiveId === args.userReceiveId;
        },
      ),
    },
    acceptFriend: {
      subscribe: withFilter(
        (payload, args, ctx) => {
          return ctx.pubsub.asyncIterator(ADD_FRIEND);
        },
        (payload, args, ctx) => {
          return payload.acceptFriend.userSendId === args.userSendId;
        },
      ),
    },
  },
  Query: {
    listFriendRequest: async (root, args, context) => {
      return context.relationship.getlistFriend(args.userId);
    },
  },
  Mutation: {
    addFriend: async (root, args, context) => {
      const { user } = context.req;
      const { pubsub } = context;
      const { userReceiveId } = args;
      return context.relationship.addFriend(pubsub, user, userReceiveId);
    },
    acceptFriend: async (root, args, context) => {
      const { user } = context.req;
      const { pubsub } = context;
      const { userSendId } = args;
      return context.relationship.acceptFriend(pubsub, user, userSendId);
    },
  },
};
