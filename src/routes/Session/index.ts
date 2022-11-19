import express from 'express';
import { allSessions } from './allSessions';
import { individualSession } from './individualSession';

export const sessionRouter = express.Router();

sessionRouter.get('/', allSessions);
sessionRouter.get('/individual', individualSession);
