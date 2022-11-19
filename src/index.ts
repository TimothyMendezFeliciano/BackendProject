import express from 'express';
import 'dotenv/config';
import DatabaseConnection from './database/DatabaseConnection';
import cors from 'cors';
import { excerciseRouter } from './routes/Excercise';
import { sessionRouter } from './routes/Session';
import { routineRouter } from './routes/Routines';
import { traineeRouter } from './routes/Trainee';
import { trainerRouter } from './routes/Trainer';

const port = process.env.DEV_PORT;

const app = express();

export let database = new DatabaseConnection();

app.use(cors());

app.use('/excercise', excerciseRouter);
app.use('/session', sessionRouter);
app.use('/routine', routineRouter);
app.use('/trainee', traineeRouter);
app.use('/trainer', trainerRouter);

app.listen(port, async () => {
    database = await database.init();
    console.log(`Server running on http://localhost:${port}/`);
});
