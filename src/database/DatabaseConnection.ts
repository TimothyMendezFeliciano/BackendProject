import { Trainer } from '../models/Trainer';
import { Routine } from '../models/Routine';
import { Excercise } from '../models/Excercise';

export default class DatabaseConnection {
    database: any = undefined;

    constructor(sequelize) {
        try {
            console.log(`Connected to Database ${sequelize.getDatabaseName()}`);
            this.database = sequelize;
        } catch (error) {
            console.error('Unable to connect to database', error);
        }
    }

    async associateModels(sequelize: any) {
        const trainer = Trainer(sequelize);
        const routine = Routine(sequelize);
        const excercise = Excercise(sequelize);
        const synchronizedDatabase = await (async () => {
            routine.hasOne(trainer, {
                foreignKey: 'id',
            });
            trainer.belongsToMany(routine, {
                foreignKey: 'id',
                through: 'Routine',
            });
            routine.hasMany(excercise, {
                foreignKey: 'id',
            });
            excercise.belongsToMany(routine, {
                foreignKey: 'id',
                through: 'Routine',
            });
        })();

        this.database = synchronizedDatabase;
    }
}
