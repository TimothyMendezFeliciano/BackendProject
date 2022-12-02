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
            },
            specialty: {
                type: DataTypes.STRING,
            },
            publicAddress: {
                type: DataTypes.STRING,
                unique: true,
            },
            profileImagePath: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            mimetype: {
                type: DataTypes.STRING,
                allowNull: true,
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
                    fields: ['publicAddress'],
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
