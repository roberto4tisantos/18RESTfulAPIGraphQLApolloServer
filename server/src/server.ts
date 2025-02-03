import express from 'express';
import path from 'node:path';
import type { Request, Response } from 'express';
import db from './config/connection.js';
import routes from './routes/index.js';

// Import the ApolloServer class
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

// Import the two parts of a GraphQL schema
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './utils/auth.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {

  await server.start();
  await db();

  const app = express();
  const PORT = process.env.PORT || 3001;

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

// app.use('/graphql', expressMiddleware(server));
  app.use('/graphql', expressMiddleware(server as any,
    {
      context: authenticateToken as any
    }
  ));  

// if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }
if (process.env.NODE_ENV === 'production') {
  // app.use(express.static(path.join(__dirname, '/client/dist')));
  // app.use(express.static(path.join(__dirname, '/client/dist')));  
  app.use(express.static(path.join(__dirname, 'dist')));    

  // app.get('*', (_req, res) => {
    app.get('*', (_req: Request, res: Response) => {  
    // res.sendFile(path.join(__dirname, '/client/dist/index.html'));
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));    
  });
};

//Invoke Routes
app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`🌍 Now listening on localhost:${PORT}`);
//     console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);    
//     });
//   });

app.listen(PORT, () => {
  console.log(`API server running 🌍 Now listening on localhost:${PORT}`);
  console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);    
});

};  

// Call the async function to start the server
startApolloServer();
