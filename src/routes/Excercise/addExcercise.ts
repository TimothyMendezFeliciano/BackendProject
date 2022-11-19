import ExcerciseService from '../../services/ExcerciseService';

export const addExcercise = async (req, res, next) => {
    try {
        const result = await new ExcerciseService().addExcercise(req.body.name);
        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(400).send([]);
    }
};
