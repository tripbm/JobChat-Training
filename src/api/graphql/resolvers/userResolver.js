export default {
  Query: {
    user: async (parent, { id }, context, info) => {
      return context.user.getUserById({ id });
    },
    listUsers: async (parent, args, context, info) => {
      return context.user.getAll(args.page, args.limit);
    },
  },
  Mutation: {
    createUser: async (parent, args, context, info) => {
      return context.user.createUser(args.data);
    },
    updateUser: async (parent, args, context, info) => {
      return context.user.updateUser(args.id, args.data);
    },
    deleteUser: async (parent, { id }, context, info) => {
      return context.user.deleteUser({ id });
    },
  },
};
