import { DataTypes } from 'sequelize';

export default function (sequelize) {
    const session = sequelize.define('session', {
        sessionDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });

    return session;
}
