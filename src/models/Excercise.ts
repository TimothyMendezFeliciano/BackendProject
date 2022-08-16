import { DataTypes } from 'sequelize';

export function Excercise(sequelize) {
    return sequelize.define('Excercise', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            default: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
        },
    });
}
