import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Message {
    content: String
    userId: Int
    groupId: Int
  }

  type Member {
    userId: String
    userName: String
    role: Int
  }

  type GroupChat {
    name: String
    members: [Member]
    type: String
  }

  input MemberInput {
    userId: String
    userName: String
    role: Int
  }

  input GroupChatInput {
    name: String
    members: [MemberInput]
    type: String
  }

  type results {
    message: String
    error: Int
  }

  extend type Query {
    messages(page: Int, limit: Int): [Message]
    listGroupChats(page: Int, limit: Int): [GroupChat]
  }

  extend type Mutation {
    addMessage(content: String, userId: Int, groupId: Int): Message
    createGroupChat(data: GroupChatInput): results
  }

  type Subscription {
    messageAdded(groupId: Int): Message
  }
`;
export default typeDefs;
