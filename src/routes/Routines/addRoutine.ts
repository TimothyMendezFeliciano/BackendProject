import RoutineService from '../../services/RoutineService';

export const addRoutine = async (req, res, next) => {
    try {
        const result = await new RoutineService().addRoutine(
            req.body.name,
            req.body.trainerId,
        );
        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(400).send([]);
    }
};
