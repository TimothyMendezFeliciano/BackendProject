import express from 'express';
import { allTrainees } from './allTrainees';
import { individualTrainee } from './individualTrainee';
import { subscribeToTrainer } from './subscribeToTrainer';
import { addTrainee } from './addTrainee';
import { uploadProfilePicture } from './uploadProfilePicture';
import multer, { Multer } from 'multer';
import { getProfilePicture } from './getProfilePicture';

export const multerUpload: Multer = multer({
    dest: './images',
});

export const traineeRouter = express.Router();

traineeRouter.get('/', allTrainees);
traineeRouter.get('/individual', individualTrainee);
traineeRouter.get('/profileImage', getProfilePicture);
traineeRouter.post('/subscribeToTrainer', subscribeToTrainer);
traineeRouter.post('/addTrainee', addTrainee);
traineeRouter.post(
    '/profileImage',
    multerUpload.single('profileImage'),
    uploadProfilePicture,
);
