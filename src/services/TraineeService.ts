import Trainee from '../models/Trainee';
import { database } from '../index';
import {v4 as uuid} from 'uuid';

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
                ...where,
            });
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async addTrainee(name: string, interest: string, publicAddress: string) {
        const trainee = Trainee(database);
        try{
            return await trainee.create({
                id: uuid(),
                name,
                interest,
                publicAddress,
                trainerId: uuid()
            })
        }catch (error) {
            console.error(error)
            return []
        }
    }

    async changeName(trainerId: string, newName: string) {
        const traineeTable = Trainee(database);

        const where: string[] = [];
        if (trainerId) where.push(trainerId);

        try {
            const trainee = await traineeTable.findOne({
                ...where,
            });
            trainee.update({
                name: newName,
            });

            return await trainee.reload();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async subscribeToTrainer(
        traineeId: string,
        trainerId: string,
    ) {
        const traineeTable = Trainee(database);

        const where: string[] = [];
        if (trainerId) where.push(trainerId);

        try {
            const trainee = await traineeTable.findOne({
                ...where,
            });
            trainee.trainerId = trainerId;
            trainee.save({ fields: ['trainerId'] });
            return await trainee.reload();
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}
