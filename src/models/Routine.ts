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
        routine.belongsToMany(models.excercise, {
            through: models.session,
        });
    };

    return routine;
}
