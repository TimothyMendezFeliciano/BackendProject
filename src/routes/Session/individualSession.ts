import SessionService from '../../services/SessionService';

export const individualSession = async (req, res, next) => {
    try {
        const result = [
            await new SessionService().getSession(
                req.query.excerciseId,
                req.query.routineId,
            ),
        ];

        if (result.length > 0) {
            return res.status(200).send(result);
        } else {
            return res.status(204).json({
                message: 'No session with ID or name',
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(400).send([]);
    }
};
