import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';


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

}, {
    tableName: 'roles',
    timestamps: true,
});