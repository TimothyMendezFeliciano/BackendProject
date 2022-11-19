import SessionService from '../../services/SessionService';

export const deleteSession = async (req, res, next) => {
    try {
        const result = await new SessionService().deleteSession(req.body.id);
        return res.status(200).send(result);
    } catch (error) {
        console.error(error);
        return res.status(400).send([]);
    }
};