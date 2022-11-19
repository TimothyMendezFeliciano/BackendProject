import TraineeService from '../../services/TraineeService';

export const allTrainees = async (req, res, next) => {
    try {
        const result = await new TraineeService().getAllTrainees();
        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(400).send([]);
    }
};
