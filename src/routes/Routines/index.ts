import express from 'express';
import { allRoutines } from './allRoutines';
import { individualRoutine } from './individualRoutine';
import { addRoutine } from './addRoutine';
import { deleteRoutine } from './deleteRoutine';

export const routineRouter = express.Router();

routineRouter.get('', allRoutines);
routineRouter.get('/individual', individualRoutine);
routineRouter.post('/addRoutine', addRoutine);
routineRouter.post('/deleteRoutine', deleteRoutine);
