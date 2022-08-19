import Session from '../models/Session';
import { v4 as uuid } from 'uuid';
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

    async addSession(sessionDate: Date, routineId: string, traineeId: string, excerciseId: string) {
        const session = Session(database);
        try {
            return await session.create({
                id: uuid(),
                sessionDate,
                routineId,
                traineeId,
                excerciseId,
            });
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async deleteSession(id: string) {
        const session = Session(database);
        try {
            if (id) {
                return await session.destroy({
                    where: {
                        id,
                    },
                });
            }
            throw Error('Session Id is required');
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}
