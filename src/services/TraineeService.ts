import Trainee from '../models/Trainee';
import { database } from '../index';

export default class TraineeService {
    async getAllTrainees() {
        const trainee = Trainee(database);
        try {
            return await trainee.findAll();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getTrainee(
        id: string = '',
        name: string = '',
        interest: string = '',
    ) {
        const trainee = Trainee(database);
        const where: string[] = [];
        if (id) where.push(id);
        if (name) where.push(name);
        if (interest) where.push(interest);

        try {
            return await trainee.findOne({
                ...where
            })
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}
