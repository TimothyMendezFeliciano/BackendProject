import ExcerciseService from '../../services/ExcerciseService';

export const deleteExcercise = async (req, res, next) => {
    try {
        const result = await new ExcerciseService().deleteExcercise(
            req.body.id,
        );
        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(400).send([]);
    }
};
