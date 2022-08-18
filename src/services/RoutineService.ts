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

    async addRoutine(name: string, trainerId: string, excerciseIds: string[]) {
        const routine = Routine(database);
        const trainer = Trainer(database);
        try {
            const result = await routine.create({
                id: uuid(),
                name,
                trainerId,
                excerciseIds,
            });
            await trainer.update(
                {
                    routineIds: [result.id],
                },
                {
                    where: {
                        id: trainerId,
                    },
                },
            );
            return result;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async deleteRoutine(name: string, trainerId: string) {
        const routine = Routine(database);
        try {
            if (name && trainerId) {
                return await routine.destroy({
                    where: {
                        name,
                        trainerId,
                    },
                });
            }
            throw Error('Name and TrainerId are necessary');
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}
