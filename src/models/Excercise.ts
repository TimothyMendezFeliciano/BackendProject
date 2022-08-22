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
                unique: true
            },
        },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['id'],
                },
                {
                    unique: true,
                    fields: ['name'],
                },
            ],
        },
    );

    excercise.associate = (models) => {
        excercise.belongsToMany(models.routine, {
            through: models.session,
        });
    };

    return excercise;
}
