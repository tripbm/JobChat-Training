import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Message {
    groupId: String
    content: String
    userId: String
  }

  extend type Query {
    messages(page: Int, limit: Int): [Message]
  }

  extend type Mutation {
    addMessage(content: String, groupId: String): Message
    editMessage(content: String, groupId: String): Message
    deleteMessage(content: String, groupId: String): Message
  }

  type Subscription {
    addedMessage(groupId: String): Message
    editMessage(groupId: String): Message
  }
`;

export default typeDefs;
