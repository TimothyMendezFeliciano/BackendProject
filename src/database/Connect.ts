import { sequelize } from './Configuration';

export const databaseInit = () => {
    try {
        console.log(`Connected to Database ${sequelize.getDatabaseName()}`);
        return sequelize;
    } catch (error) {
        return console.error('Unable to connect to database', error);
    }
};

export type DatabaseType = typeof sequelize;
