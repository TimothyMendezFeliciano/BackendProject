import express from 'express';
import { allRoutines } from './allRoutines';
import { individualRoutine } from './individualRoutine';

export const routineRouter = express.Router();

routineRouter.get('', allRoutines);
routineRouter.get('/individual', individualRoutine);
