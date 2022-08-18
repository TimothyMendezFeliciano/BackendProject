import Trainer from '../models/Trainer';
import { v4 as uuid } from 'uuid';
import { database } from '../index';

export default class TrainerService {
    async getAllTrainers() {
        const trainer = Trainer(database);
        try {
            return await trainer.findAll();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getTrainer(id: string = '', name: string = '') {
        const trainer = Trainer(database);
        // TODO: Build Utility method to construct where clause
        const where: string[] = [];
        if (id) where.push(id);
        if (name) where.push(name);

        try {
            return await trainer.findOne({
                ...where,
            });
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async addTrainer(name: string, specialty: string) {
        const trainer = Trainer(database);
        try {
            return trainer.create({
                id: uuid(),
                name,
                specialty,
            });
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}
