import TrainerService from '../../services/TrainerService';

export const addTrainer = async (req, res, next) => {
    try {
        const result = await new TrainerService().addTrainer(
            req.body.name,
            req.body.specialty,
            req.body.publicAddress,
        );
        return result;
    } catch (error) {
        console.error(error);
        return res.status(400).send([]);
    }
};