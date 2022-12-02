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

    async getTrainer(
        id: string = '',
        name: string = '',
        publicAddress: string = '',
    ) {
        const trainer = Trainer(database);
        const where: string[] = [];
        if (id) where.push(id);
        if (name) where.push(name);
        if (publicAddress) where.push(publicAddress);

        try {
            return await trainer.findOne({
                ...where,
            });
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async addTrainer(name: string, specialty: string, publicAddress: string) {
        const trainer = Trainer(database);
        try {
            return await trainer.create({
                id: uuid(),
                name,
                specialty,
                publicAddress,
            });
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async uploadProfileImage(
        trainerId: string,
        profileImagePath: string,
        mimetype: string,
        publicAddress?: string,
    ) {
        const trainerTable = await Trainer(database);

        const where: string[] = [];
        if (trainerId) where.push(trainerTable);
        if (publicAddress) where.push(publicAddress);

        try {
            const trainer = await trainerTable.findOne({
                ...where,
            });
            trainer.update({
                profileImagePath,
                mimetype,
            });

            return await trainer.reload();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async deleteTrainer(publicAddress: string) {
        try {
            const trainerTable = await Trainer(database);
            const where: string[] = [];
            where.push(publicAddress);

            const trainer = await trainerTable.findOne({
                ...where,
            });

            await trainer.destroy();
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}
