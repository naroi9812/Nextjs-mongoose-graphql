import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";

import { typeDefs } from "../../graphql/schemas";
import { resolvers } from "../../graphql/resolvers";

import connectDB from "../../middleware/connectDB";

const cors = Cors();
const apolloServer = new ApolloServer({ typeDefs, resolvers });

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  try {
    await connectDB();
    await startServer;
    await apolloServer.createHandler({
      path: "/api/graphql",
    })(req, res);
  } catch (err) {
    throw err;
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};
