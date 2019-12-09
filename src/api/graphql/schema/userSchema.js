import { gql } from 'apollo-server-express';

const typeDefs = gql`
# defines type
type User {
    user_id: Int!,
    user_name: String!,
    password: String!,
    email: String!,
    firstName: String,
    lastName: String,
    birthday: String,
    gender: Int ,
    action: Boolean ,
    role: Int
}
type token {
    token: String!
}

# defines input
input InputLogin {
    user_name: String!
    password: String!
}

input InputCreateUser {
    user_id: Int!,
        user_name: String!,
        password: String!,
        email: String!,
        firstName: String,
        lastName: String,
        birthday: String,
        gender: Int ,
        action: Boolean ,
        role: Int
}

type Query {
    user(id: Int!): User!
    login(data: InputLogin): token!
}

type Mutation {
        createUser(
        data: InputCreateUser!) : User!
}
`
export default typeDefs;