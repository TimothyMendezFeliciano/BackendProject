import express from 'express';
import { allTrainees } from './allTrainees';
import { individualTrainee } from './individualTrainee';
import { subscribeToTrainer } from './subscribeToTrainer';
import { addTrainee } from './addTrainee';

export const traineeRouter = express.Router();

traineeRouter.get('', allTrainees);
traineeRouter.get('/individual', individualTrainee);
traineeRouter.post('/subscribeToTrainer', subscribeToTrainer);
traineeRouter.post('/addTrainee', addTrainee);
