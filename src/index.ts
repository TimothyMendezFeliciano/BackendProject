import express from 'express';
import 'dotenv/config';
import DatabaseConnection from './database/DatabaseConnection';
import cors from 'cors';
import { excerciseRouter } from './routes/Excercise';
import { sessionRouter } from './routes/Session';
import { routineRouter } from './routes/Routines';

const port = process.env.DEV_PORT;

const app = express();

export let database = new DatabaseConnection();

app.use(cors());

app.use('/excercise', excerciseRouter);
app.use('/session', sessionRouter);
app.use('/routine', routineRouter);

app.listen(port, async () => {
    database = await database.init();
    console.log(`Server running on http://localhost:${port}/`);
});
