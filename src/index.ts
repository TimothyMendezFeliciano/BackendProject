import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema';
import 'dotenv/config';
import DatabaseConnection from './database/DatabaseConnection';

const port = process.env.DEV_PORT;

const app = express();

export const database = new DatabaseConnection();

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
    }),
);

app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}/graphql`);
});
