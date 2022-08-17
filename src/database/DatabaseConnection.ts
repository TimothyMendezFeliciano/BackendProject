import { Trainer } from '../models/Trainer';
import { Routine } from '../models/Routine';
import { Excercise } from '../models/Excercise';
import { Sequelize } from 'sequelize';

let cachedDB;

export default class DatabaseConnection {
    static async init() {
        if (!cachedDB) {
            cachedDB = new Sequelize(
                process.env.DATABASE_NAME as string,
                process.env.DATABASE_USERNAME as string,
                process.env.DATABASE_PASSWORD,
                {
                    dialect: 'postgres',
                    host: process.env.DATABASE_HOST,
                },
            );
            await this.associateModels();
        }
        return cachedDB;
    }

    static async associateModels() {
        // const trainer = Trainer(cachedDB);
        // const routine = Routine(cachedDB);
        // const excercise = Excercise(cachedDB);
        // routine.hasOne(trainer, {
        //     foreignKey: 'id',
        // });
        // trainer.belongsToMany(routine, {
        //     foreignKey: 'id',
        //     through: 'Routine',
        // });
        // routine.hasMany(excercise, {
        //     foreignKey: 'id',
        // });
        // excercise.belongsToMany(routine, {
        //     foreignKey: 'id',
        //     through: 'Routine',
        // });

        await cachedDB.sync({ force: true });
    }
}
