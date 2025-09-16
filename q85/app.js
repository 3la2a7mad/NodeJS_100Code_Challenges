// Alaa Ahmad

async function startServer() {
  const { ApolloServer } = await import('@apollo/server');
  const { startStandaloneServer } = await import('@apollo/server/standalone');

  // includes a 'Mutation' type.
  const typeDefs = `
    type Query {
      hello: String!
    }  
    type Mutation {
      add(a: Int!, b: Int!): Int!
    }
  `;

  // includes a resolver for the 'add' mutation.
  const resolvers = {
    Query: {
      hello: () => 'Hello, this is a GraphQL server by Alaa Ahmad!',
    },
    Mutation: {
      // The 'args' object contains the parameters passed to the mutation.
      add: (parent, args) => {
        console.log(`Executing 'add' mutation with a=${args.a}, b=${args.b}`);
        return args.a + args.b;
      },
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`Server ready at: ${url}`);
}

startServer();