import SessionService from '../../services/SessionService';

export const allSessions = async (req, res, next) => {
    try {
        const result = await new SessionService().getAllSessions();
        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(400).send([]);
    }
};
