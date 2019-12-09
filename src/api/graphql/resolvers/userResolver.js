
export default {
  Query: {
    user: async (parent, { id }, context, info ) => {
      const user = await context.user.getUserById({ id });
      return user;
    }
  },
  Mutation: {
    createUser: async (parent, args, context, info) => {
      const user = await context.user.createUser(args.data);
      return user;
    },
  }
};