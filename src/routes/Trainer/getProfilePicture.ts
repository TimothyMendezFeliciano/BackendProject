import TrainerService from '../../services/TrainerService';
import fs from 'fs';

export const getProfilePicture = async (req, res, next) => {
    try {
        const result = await new TrainerService().getTrainer(
            req.query.trainerId,
        );

        const filePath = result.profileImagePath.slice(`images\\`);
        const image = fs.readFileSync(`./${filePath}`);
        const b64 = Buffer.from(image).toString('base64');
        return res.status(201).send(`data:${result.mimetype};base64,${b64}`);
    } catch (error) {
        console.error(error);
        return [];
    }
};
