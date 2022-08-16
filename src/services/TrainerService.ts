import { Trainer } from '../models/Trainer';
import { database } from '../index';

export default class TrainerService {
    async getAllTrainers() {
        const trainer = Trainer(database);
        try {
            return await trainer.findAll();
        } catch (error) {
            return [];
        }
    }
}
