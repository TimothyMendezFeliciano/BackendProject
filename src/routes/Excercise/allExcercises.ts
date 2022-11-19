import ExcerciseService from '../../services/ExcerciseService';

export const allExcercises = async (req, res, next) => {
    try {
        const result = await new ExcerciseService().getAllExcercises();
        return res.status(200).send(result);
    } catch (e) {
        console.error(e);
        return res.status(400).send([]);
    }
};
