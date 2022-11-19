import TrainerService from '../../services/TrainerService';

export const individualTrainer = async (req, res, next) => {
    try {
        const result = [
            await new TrainerService().getTrainer(
                req.query.id,
                req.query.name,
                req.query.publicAddress,
            ),
        ];
        if (result.length > 0) {
            return res.status(200).send(result);
        } else {
            return res.status(204).json({
                message: 'No trainer with ID, name or publicAddress',
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(400).send([]);
    }
};