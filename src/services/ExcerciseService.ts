import Excercise from '../models/Excercise';
import { v4 as uuid } from 'uuid';
import { database } from '../index';

export default class ExcerciseService {
    async getAllExcercises() {
        const excercise = Excercise(database);
        try {
            return await excercise.findAll();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getExcercise(id: string = '', name: string = '') {
        const excercise = Excercise(database);

        const where: string[] = [];
        if (id) where.push(id);
        if (name) where.push(name);

        try {
            return await excercise.findOne({
                ...where,
            });
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async addExcercise(name: string) {
        const excercise = Excercise(database);
        try {
            return await excercise.create({
                id: uuid(),
                name,
            });
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}
