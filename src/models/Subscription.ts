// models/Subscription.ts
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { User } from './User';
import { Plan } from './Plan';

export const Subscription = sequelize.define('Subscription', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    planId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('active', 'cancelled', 'trialing'),
        defaultValue: 'active',
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'subscriptions',
    timestamps: true,
});

User.hasOne(Subscription, { foreignKey: 'userId' });
Subscription.belongsTo(User, { foreignKey: 'userId' });

Plan.hasMany(Subscription, { foreignKey: 'planId' });
Subscription.belongsTo(Plan, { foreignKey: 'planId' });