const users = [{ _id: "123", email: "a123@graphql.com", password: "123456" }];
import userResolvers from "./user-resolvers";

export const resolvers = {
  Query: {
    getUsers: userResolvers.getUsers,
    login: userResolvers.login,
  },
  Mutation: {
    createUser: userResolvers.createUser,
  },
};
