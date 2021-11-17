import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    password: String
  }
  type Query {
    getUsers: [User!]!
  }
  type Mutation {
    createUser(email: String!, password: String!): User
  }
`;
