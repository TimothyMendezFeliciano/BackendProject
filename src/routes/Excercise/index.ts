import express from 'express';
import { allExcercises } from './allExcercises';
import { individualExcercise } from './individualExcercise';

export const excerciseRouter = express.Router();

excerciseRouter.get('/', allExcercises);
excerciseRouter.get('/individual', individualExcercise);
