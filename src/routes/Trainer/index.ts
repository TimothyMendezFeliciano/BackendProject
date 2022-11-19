import express from 'express';
import { allTrainers } from './allTrainers';
import { individualTrainer } from './individualTrainer';

export const trainerRouter = express.Router();

trainerRouter.get('', allTrainers);
trainerRouter.get('/individual', individualTrainer);
