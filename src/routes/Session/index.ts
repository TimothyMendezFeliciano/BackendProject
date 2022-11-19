import express from 'express';
import { allSessions } from './allSessions';
import { individualSession } from './individualSession';
import { addSession } from './addSession';
import { deleteSession } from './deleteSession';

export const sessionRouter = express.Router();

sessionRouter.get('/', allSessions);
sessionRouter.get('/individual', individualSession);
sessionRouter.post('/addSession', addSession);
sessionRouter.post('/deleteSession', deleteSession);
