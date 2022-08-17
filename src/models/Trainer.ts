import { DataTypes, UUID } from 'sequelize';

export default function (sequelize) {
    const trainer = sequelize.define(
        'trainer',
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
            specialty: {
                type: DataTypes.STRING,
            },
            routineIds: {
                type: DataTypes.ARRAY(DataTypes.UUID),
                allowNull: true,
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

    trainer.associate = (models) => {
        trainer.hasMany(models.routine);
    };
    return trainer;
}
