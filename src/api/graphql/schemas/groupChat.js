import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Member {
    userId: String!
    userName: String!
    role: String!
  }

  type GroupChat {
    _id: String
    name: String
    members: [Member]
    type: String!
  }

  input MemberInput {
    userId: String!
    userName: String!
    role: String!
  }

  input GroupChatInput {
    name: String
    members: [MemberInput]!
  }

  type Results {
    message: String
    error: Int
  }

  extend type Query {
    listGroupChatById: [GroupChat]
  }

  extend type Mutation {
    createGroupChat(data: GroupChatInput): GroupChat!
    deleteGroupChat(groupChatId: String!): Results
    addMemberGroupChat(memberId: String!, role: String!, groupChatId: String!): Results
    leaveGroupChat(groupChatId: String!): Results
  }
`;

export default typeDefs;
