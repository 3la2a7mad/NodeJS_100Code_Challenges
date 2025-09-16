// Alaa Ahmad

async function startServer() {
  const { ApolloServer } = await import('@apollo/server');
  const { startStandaloneServer } = await import('@apollo/server/standalone');

  //Defines the structure of the data and the queries available.
  const typeDefs = `#graphql
    type Query {
      hello: String!
    }
  `;

  //Functions that return the data for the schema fields.
  const resolvers = {
    Query: {
      hello: () => `Hello, this is a GraphQL server by Alaa Ahmad!`,
    },
  };

  // Create the Apollo Server instance.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  //Start the server.
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Server ready at: ${url}`);
}

startServer();