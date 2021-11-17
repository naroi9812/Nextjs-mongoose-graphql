const users = [{ _id: "123", email: "a123@graphql.com", password: "123456" }];

export const resolvers = {
  Query: {
    getUsers: () => users,
  },
};
