import { DataTypes } from 'sequelize';

export default function (sequelize) {
    const routine = sequelize.define(
        'routine',
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
            excerciseIds: {
                type: DataTypes.ARRAY(DataTypes.UUID),
                allowNull: true,
                foreignKey: true,
            },
            trainerId: {
                type: DataTypes.UUID,
                allowNull: false,
                foreignKey: true,
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

    routine.associate = (models) => {
        routine.hasMany(models.excercise);
    };
    return routine;
}
