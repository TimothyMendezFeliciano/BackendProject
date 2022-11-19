import RoutineService from '../../services/RoutineService';

export const allRoutines = async (req, res, next) => {
    try {
        const result = await new RoutineService().getAllRoutines();
        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(400).send([]);
    }
};
