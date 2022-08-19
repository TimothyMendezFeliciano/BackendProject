import Session from '../models/Session';
import { database } from '../index';

export default class SessionService {
    async getAllSessions() {
        const session = Session(database);

        try {
            return await session.findAll();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getSession(excerciseId: string = '', routineId: string = '') {
        const session = Session(database);
        const where: string[] = [];
        if (excerciseId) where.push(excerciseId);
        if (routineId) where.push(routineId);

        try {
            return await session.findAll({
                ...where,
            });
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}
