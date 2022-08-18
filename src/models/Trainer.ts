import { DataTypes } from 'sequelize';

export default function (sequelize) {
    const trainer = sequelize.define(
        'trainer',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                default: DataTypes.UUIDV4,
                unique: true,
            },
            name: {
                type: DataTypes.STRING,
                unique: true,
            },
            specialty: {
                type: DataTypes.STRING,
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

    trainer.associate = (models) => {
        trainer.hasMany(models.routine, {
            foreignKey: 'trainerId',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
        trainer.hasMany(models.trainee, {
            foreignKey: 'trainerId',
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
        });
    };
    return trainer;
}
