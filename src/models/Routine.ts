import { DataTypes } from 'sequelize';

export function Routine(sequelize) {
    return sequelize.define('Routine', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            default: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
        },
        trainerId: {
            type: DataTypes.UUID,
        },
        excercises: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        },
    });
}
