import TraineeService from '../../services/TraineeService';

export const addTrainee = async (req, res, next) => {
    try {
        const result = await new TraineeService().addTrainee(
            req.body.name,
            req.body.interest,
            req.body.publicAddress,
        );
        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(400).send([]);
    }
};
