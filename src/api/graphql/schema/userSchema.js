import { gql } from 'apollo-server-express';

const typeDefs = gql`
  # defines type
  type User {
    userId: Int!
    userName: String!
    password: String!
    email: String!
    firstName: String
    lastName: String
    birthday: String
    gender: Int
    action: Boolean
    role: Int
  }
  type token {
    token: String!
  }

  # defines input
  input InputLogin {
    userName: String!
    password: String!
  }

  input InputCreateUser {
    userId: Int!
    userName: String!
    password: String!
    email: String!
    firstName: String
    lastName: String
    birthday: String
    gender: Int
    action: Boolean
    role: Int
  }

  type Query {
    user(id: Int!): User
    listUsers(page: Int, limit: Int): [User]
    login(data: InputLogin): token!
  }

  type CreateUserResult {
    error: Int
    message: String
  }

  type Mutation {
    createUser(data: InputCreateUser!): CreateUserResult
  }
`;
export default typeDefs;
