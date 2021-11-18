import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type User {
    _id: ID!
    email: String!
    password: String
    comments: [Comment!]!
  }
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: String!
  }
  type Comment {
    _id: ID!
    body: String!
    creator: User!
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    login(email: String!, password: String!): AuthData!
  }
  type Mutation {
    createUser(email: String!, password: String!): User
    createComment(body: String!): Comment
  }
`;
