import { DataTypes } from 'sequelize';

export function Trainer(sequelize) {
    return sequelize.define('Trainer', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            default: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
        },
        specialty: {
            type: DataTypes.STRING,
        },
    });
}
