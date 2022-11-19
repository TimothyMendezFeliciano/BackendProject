import express from 'express';
import { allTrainees } from './allTrainees';
import { individualTrainee } from './individualTrainee';

export const traineeRouter = express.Router();

traineeRouter.get('', allTrainees);
traineeRouter.get('/individual', individualTrainee);
