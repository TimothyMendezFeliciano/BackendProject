import { DataTypes, Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';

let cachedDB;
const basename = path.basename(module.filename);

export default class DatabaseConnection {
    async init() {
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
        }
        cachedDB = await this.associateModels();
        return cachedDB;
    }

    private async associateModels() {
        const filtered = fs
            .readdirSync(path.resolve(__dirname, '../models'))
            .filter(function (file) {
                return (
                    file.indexOf('.') !== 0 &&
                    file !== basename &&
                    (file.slice(-3) === '.js' || file.slice(-3) === '.ts')
                );
            });
        filtered.forEach(function (file) {
            const model = require(path.join(
                path.resolve(__dirname, '../models'),
                file,
            )).default(cachedDB, DataTypes);
            cachedDB[model.name] = model;
        });

        Object.keys(cachedDB).forEach(function (modelName) {
            if (cachedDB[modelName].associate) {
                cachedDB[modelName].associate(cachedDB);
            }
        });

        return await cachedDB.sync({ force: true });
    }
}
