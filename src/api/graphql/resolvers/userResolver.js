import { LIMIT } from '../../../config/index';

export default {
  Query: {
    user: async (parent, { id }, context, info) => {
      return context.user.getUserById({ id });
    },
    listUsers: async (parent, args, context, info) => {
      return context.user.getAll(args.page, (args.limit = LIMIT));
    },
  },
  Mutation: {
    createUser: async (parent, args, context, info) => {
      return context.user.createUser(args.data);
    },
  },
};
