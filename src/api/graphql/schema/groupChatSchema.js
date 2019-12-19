import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Member {
    userId: String!
    userName: String!
    role: String
  }

  type GroupChat {
    _id: String
    name: String
    members: [Member]
    type: String
  }

  input MemberInput {
    userId: String
    userName: String
    role: String
  }

  input GroupChatInput {
    name: String
    members: [MemberInput]
    type: String
  }

  type Results {
    message: String
    error: Int
  }

  extend type Query {
    listGroupChats(page: Int, limit: Int): [GroupChat]
  }

  extend type Mutation {
    createGroupChat(data: GroupChatInput): Results
  }
`;
export default typeDefs;
