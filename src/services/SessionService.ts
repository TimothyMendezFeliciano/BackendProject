import Session from '../models/Session';
import { database } from '../index';
import { v4 as uuid } from 'uuid';

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

    async addSession(sessionDate: Date, routineId: string, traineeId: string) {
        const session = Session(database);
        try {
            return await session.create({
                id: uuid(),
                sessionDate,
                routineId,
                traineeId,
            });
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}
