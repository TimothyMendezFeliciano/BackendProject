import SessionService from '../../services/SessionService';

export const addSession = async (req, res, next) => {
    try {
        const result = await new SessionService().addSession(
            req.body.sessionDate,
            req.body.routineId,
            req.body.traineeId,
            req.body.excerciseId,
        );
        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(400).send([]);
    }
};
