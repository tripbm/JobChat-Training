import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    _id: String
    userName: String
    email: String
    firstName: String
    lastName: String
    birthday: String
    gender: String
    action: Boolean
    role: String
  }

  input InputLogin {
    userName: String!
    password: String!
  }

  input InputUser {
    userName: String!
    password: String!
    email: String!
    firstName: String
    lastName: String
    birthday: String
    gender: String
    action: Boolean
    role: String
  }

  type Query {
    user(id: String!): User
    myProfile: User
    otherProfile(userId: String!): User
    listUsers(page: Int, limit: Int): [User]
    loginUser(data: InputLogin!): String
  }

  type DeleteUserResult {
    error: Int
    message: String
  }

  input InputUserUpdate {
    password: String!
    firstName: String
    lastName: String
    birthday: String
    gender: String
    newPassword: String
  }

  type Mutation {
    registerUser(data: InputUser!): User
    updateProfile(data: InputUserUpdate!): User
    deleteUser(id: String!): DeleteUserResult
  }
`;

export default typeDefs;
