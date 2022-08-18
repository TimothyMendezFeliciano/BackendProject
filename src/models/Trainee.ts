import { DataTypes } from 'sequelize';

export default function (sequelize) {
    const trainee = sequelize.define('trainee', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            default: DataTypes.UUIDV4,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        interest: {
            type: DataTypes.STRING,
        },
    });

    trainee.associate = (models) => {
        trainee.belongsToMany(models.routine, {
            through: models.session,
        });
    };
    return trainee;
}
