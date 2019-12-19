import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Message {
    content: String
    userId: String
    groupId: String
  }

  extend type Query {
    messages(page: Int, limit: Int): [Message]
  }

  extend type Mutation {
    addMessage(content: String, userId: String, groupId: String): Message
  }

  type Subscription {
    messageAdded(groupId: String): Message
  }
`;
export default typeDefs;
