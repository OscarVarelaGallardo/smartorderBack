// models/Plan.ts
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

export const Plan = sequelize.define('Plan', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    features: {
        type: DataTypes.JSON,
        allowNull: true,
    },
}, {
    tableName: 'plans',
    timestamps: false,
});

