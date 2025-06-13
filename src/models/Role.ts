import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { User } from './User';

export const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // evita que existan dos roles con el mismo nombre
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // nombre de la tabla relacionada
            key: 'id',
        },
    },
}, {
    tableName: 'roles',
    timestamps: true,
});