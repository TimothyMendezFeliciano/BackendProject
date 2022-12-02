import express from 'express';
import { allTrainers } from './allTrainers';
import { individualTrainer } from './individualTrainer';
import { addTrainer } from './addTrainer';
import multer, { Multer } from 'multer';
import { uploadProfilePicture } from './uploadProfilePicture';
import { getProfilePicture } from './getProfilePicture';
import { deleteTrainer } from './deleteTrainer';

export const multerUpload: Multer = multer({
    dest: './images',
});

export const trainerRouter = express.Router();

trainerRouter.get('/', allTrainers);
trainerRouter.get('/individual', individualTrainer);
trainerRouter.get('/profileImage', getProfilePicture);
trainerRouter.post('/addTrainer', addTrainer);
trainerRouter.post(
    '/profileImage',
    multerUpload.single('profileImage'),
    uploadProfilePicture,
);
trainerRouter.delete('/deleteTrainer', deleteTrainer);
