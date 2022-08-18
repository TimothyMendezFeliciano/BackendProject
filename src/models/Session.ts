import { DataTypes } from 'sequelize';

export default function (sequelize) {
    const session = sequelize.define('session', {
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });

    return session;
}
