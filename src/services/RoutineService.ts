import Routine from '../models/Routine';
import { database } from '../index';

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
}
