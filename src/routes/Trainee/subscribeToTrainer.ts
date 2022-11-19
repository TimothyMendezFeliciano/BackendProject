import TraineeService from '../../services/TraineeService';

export const subscribeToTrainer = async (res, req, next) => {
    try {
        const result = await new TraineeService().subscribeToTrainer(
            req.body.traineeId,
            req.body.trainerId,
        );

        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(400).send([]);
    }
};
