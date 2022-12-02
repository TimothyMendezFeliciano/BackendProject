import TraineeService from '../../services/TraineeService';

export const uploadProfilePicture = async (req, res, next) => {
    try {
        const trainee = await new TraineeService().uploadProfileImage(
            req.body.traineeId,
            req.file.path,
            req.file.mimetype,
            req.body.publicAddress,
        );
        return res.status(201).send('OK');
    } catch (error) {
        console.error(error);
        return res.status(400).send([]);
    }
};
