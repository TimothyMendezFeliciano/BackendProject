import TraineeService from '../../services/TraineeService';

export const individualTrainee = async (req, res, next) => {
    try {
        const result = [
            await new TraineeService().getTrainee(
                req.query.id,
                req.query.name,
                req.query.interest,
                req.query.publicAddress,
            ),
        ];

        if (result.length > 0) {
            return res.status(200).send(result);
        } else {
            return res.status(204).send({
                message:
                    'No trainee with combination of ID, name, interest or publicAddress',
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(400).send([]);
    }
};
