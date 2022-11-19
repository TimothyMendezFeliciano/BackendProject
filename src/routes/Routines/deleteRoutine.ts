import RoutineService from '../../services/RoutineService';

export const deleteRoutine = async (req, res, next) => {
    try {
        const result = await new RoutineService().deleteRoutine(
            req.body.id,
            req.body.trainerId,
        );
        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(400).send([]);
    }
};