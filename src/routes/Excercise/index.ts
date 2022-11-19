import express from 'express';
import { allExcercises } from './allExcercises';
import { individualExcercise } from './individualExcercise';
import { addExcercise } from './addExcercise';
import { deleteExcercise } from './deleteExcercise';

export const excerciseRouter = express.Router();

excerciseRouter.get('/', allExcercises);
excerciseRouter.get('/individual', individualExcercise);
excerciseRouter.post('/addExcercise', addExcercise);
excerciseRouter.post('/deleteExcercise', deleteExcercise);
