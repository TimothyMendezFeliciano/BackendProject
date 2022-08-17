import { DataTypes } from 'sequelize';

export default function (sequelize) {
    const excercise = sequelize.define(
        'excercise',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                default: DataTypes.UUIDV4,
            },
            name: {
                type: DataTypes.STRING,
            },
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['id', 'name'],
                },
            ],
        },
    );

    return excercise;
}
