import { LIMIT } from '../../../config/index';

export default {
  Query: {
    user: async (parent, { id }, context, info) => {
      const user = await context.user.getUserById({ id });
      return user;
    },
    listUsers: async (parent, args, context, info) => {
      const users = await context.user.getAll(args.page, (args.limit = LIMIT));
      return users;
    },
  },
  Mutation: {
    createUser: async (parent, args, context, info) => {
      const user = await context.user.createUser(args.data);
      return user;
    },
  },
};
