# Graphql and MongoDB building API routes for Next.js
This is a small example showing how to build a member system using Next.js API routes with Graphql and MongoDB

### Some Dependencies
1. [graphql](https://www.npmjs.com/package/graphql)
2. [apollo-server-micro](https://www.npmjs.com/package/apollo-server-micro)  
3. [cors](https://www.npmjs.com/package/cors)  
for solving [cors](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) issue
4. [next-connect](https://www.npmjs.com/package/next-connect)  
different way to implement middleware
5. [graphql-request](https://www.npmjs.com/package/graphql-request)  
 an easier way for graphql request, can be replace by fetch or axios
6. [bcrypt](https://www.npmjs.com/package/bcrypt), [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)  
for member system, can be replace by other package

## Database
This example use MongoDB as an example, database can be substitute by changing related file  
* connectDB in middleware folder
* schema in model folder
* resolvers in graphql folder

## Tips

### 1. next-connect 
Middlewares can be implement in single route by using:
```
import nc from "next-connect";
const handler = nc()
  .use(...middlewares) // include cors and ApolloServer
 
 export default handler;
```
### 2. authorization
authorization can be implement by context in ApolloServer
```
const apolloServer = new ApolloServer({ typeDefs, resolvers, context: isAuth });
```
**isAuth** can be used in resolvers
```
async (parent, args, context, info) => {
  //context.isAuth
}
```

