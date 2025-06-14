// src/models/Category.ts
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

export const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'categories',
    timestamps: false,
});

