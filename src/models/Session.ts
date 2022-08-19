import { DataTypes } from 'sequelize';

export default function (sequelize) {
    const session = sequelize.define('session', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            default: DataTypes.UUIDV4,
            unique: true,
        },
        sessionDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });

    return session;
}
