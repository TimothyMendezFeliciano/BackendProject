import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema';
import 'dotenv/config';
import DatabaseConnection from './database/DatabaseConnection';
import cors from 'cors';

const port = process.env.DEV_PORT;

const app = express();

export let database = new DatabaseConnection();

app.use(cors());

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
    }),
);

app.listen(port, async () => {
    database = await database.init();
    console.log(`Server running on http://localhost:${port}/graphql`);
});
