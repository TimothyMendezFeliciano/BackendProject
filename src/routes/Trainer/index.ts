import express from 'express';
import { allTrainers } from './allTrainers';
import { individualTrainer } from './individualTrainer';
import { addTrainer } from './addTrainer';

export const trainerRouter = express.Router();

trainerRouter.get('', allTrainers);
trainerRouter.get('/individual', individualTrainer);
trainerRouter.post('/addTrainer', addTrainer);
