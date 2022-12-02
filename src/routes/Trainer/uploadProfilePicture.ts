import TrainerService from '../../services/TrainerService';

export const uploadProfilePicture = async (req, res, next) => {
    try {
        const trainer = await new TrainerService().uploadProfileImage(
            req.body.trainerId,
            req.file.path,
            req.file.mimetype,
            req.bodyh.publicAddress,
        );

        return res.status(201).send('OK');
    } catch (error) {
        console.error(error);
        return res.status(400).send([]);
    }
};
