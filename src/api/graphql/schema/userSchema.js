import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    _id: String!
    userName: String!
    password: String!
    email: String!
    firstName: String
    lastName: String
    birthday: String
    gender: Int
    action: Boolean
    role: String
  }

  type Token {
    token: String!
  }

  input InputLogin {
    userName: String!
    password: String!
  }

  input InputCreateUser {
    userName: String!
    password: String!
    email: String!
    firstName: String
    lastName: String
    birthday: String
    gender: Int
    action: Boolean
    role: String
  }

  type Query {
    user(id: String!): User
    listUsers(page: Int, limit: Int): [User]
    login(data: InputLogin): Token!
  }

  type CreateUserResult {
    error: Int
    message: String
  }

  type UpdateUserResult {
    error: Int
    message: String
  }

  type DeleteUserResult {
    error: Int
    message: String
  }

  type Mutation {
    createUser(data: InputCreateUser!): CreateUserResult
    updateUser(id: String, data: InputCreateUser!): UpdateUserResult
    deleteUser(id: String!): DeleteUserResult
  }
`;
export default typeDefs;
