import TrainerService from '../../services/TrainerService';

export const allTrainers = async (req, res, next) => {
    try {
        const result = await new TrainerService().getAllTrainers();
        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(400).send([]);
    }
};
