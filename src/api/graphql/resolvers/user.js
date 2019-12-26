export default {
  Query: {
    loginUser: async (parent, args, context, info) => {
      const { userName, password } = args.data;
      return context.user.loginUser(userName, password);
    },
    user: async (parent, { id }, context, info) => {
      return context.user.getUserById({ id });
    },
    listUsers: async (parent, args, context, info) => {
      return context.user.getAll(args.page, args.limit);
    },
    myProfile: async (parent, args, context, info) => {
      const { user } = context.req;
      return context.user.getProfile(user);
    },
    otherProfile: async (parent, args, context, info) => {
      const { userId } = args;
      return context.user.getOtherProfile(userId);
    },
  },
  Mutation: {
    registerUser: async (parent, args, context, info) => {
      const { data } = args;
      return context.user.registerUser(data);
    },
    updateProfile: async (parent, args, context, info) => {
      const { user } = context.req;
      const { data } = args;
      return context.user.updateProfile(user, data);
    },
    deleteUser: async (parent, { id }, context, info) => {
      return context.user.deleteUser({ id });
    },
  },
};
