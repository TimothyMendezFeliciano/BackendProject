import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema';
import 'dotenv/config';
import { databaseInit } from './database/Connect';

const port = process.env.DEV_PORT;

const app = express();

const sequelizeDatabase = databaseInit();

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true,
    }),
);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/graphql`);
});
