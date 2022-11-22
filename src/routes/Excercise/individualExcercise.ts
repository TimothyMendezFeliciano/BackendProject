import ExcerciseService from '../../services/ExcerciseService';

export const individualExcercise = async (req, res, next) => {
    try {
        const result = [
            await new ExcerciseService().getExcercise(
                req.query.id,
                req.query.name,
            ),
        ];
        if (result.length > 0) {
            return res.status(200).send(result);
        } else {
            return res.status(204).json({
                message: 'No excercise with ID or name',
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(400).send([]);
    }
};
