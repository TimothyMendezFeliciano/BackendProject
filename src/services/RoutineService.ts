import Routine from '../models/Routine';
import { database } from '../index';
import { v4 as uuid } from 'uuid';
import Trainer from '../models/Trainer';

export default class RoutineService {
    async getAllRoutines() {
        const routine = Routine(database);
        try {
            return await routine.findAll();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getRoutine(id: string = '', name: string = '') {
        const routine = Routine(database);
        const where: string[] = [];
        if (id) where.push(id);
        if (name) where.push(name);

        try {
            return await routine.findOne({
                ...where,
            });
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getRoutineByTrainerId(trainerId: string = '') {
        const routine = Routine(database);
        try {
            return await routine.findAll({
                where: {
                    trainerId,
                },
            });
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async addRoutine(name: string, trainerId: string) {
        const routine = Routine(database);
        try {
            return await routine.create({
                id: uuid(),
                name,
                trainerId,
            });
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async deleteRoutine(id: string, trainerId: string) {
        const routine = Routine(database);
        try {
            if (id && trainerId) {
                return await routine.destroy({
                    where: {
                        id,
                        trainerId,
                    },
                });
            }
            throw Error('Id, Name and TrainerId are necessary');
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}
