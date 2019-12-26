import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type UserSendId {
    userSendId: String!
  }

  extend type Query {
    listFriendRequest: [UserSendId]
  }

  type Result {
    message: String!
    error: Int!
  }

  type Relationship {
    userSendId: String!
    userReceiveId: String!
  }

  extend type Mutation {
    addFriend(userReceiveId: String!): Relationship!
    acceptFriend(userSendId: String!): Relationship
  }

  extend type Subscription {
    addFriend(userReceiveId: String!): Relationship
    acceptFriend(userSendId: String!): Relationship
  }
`;

export default typeDefs;
