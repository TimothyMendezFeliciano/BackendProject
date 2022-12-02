import TrainerService from '../../services/TrainerService';

export const deleteTrainer = async (req, res, next) => {
    try {
        const result = await new TrainerService().deleteTrainer(
            req.params.publicAddress,
        );

        if (result) {
            return res.status(200).send('OK');
        } else {
            throw Error('Nothing to delete');
        }
    } catch (error) {
        console.error(error);
        return res.status(400).send([]);
    }
};
