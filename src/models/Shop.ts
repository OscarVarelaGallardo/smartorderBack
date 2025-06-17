import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { User } from './User';

export const Shop = sequelize.define('Shop', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 7), // Ej: 19.432608
        allowNull: false,
    },
    longitude: {
        type: DataTypes.DECIMAL(10, 7), // Ej: -99.133209
        allowNull: false,
    },
    isActive:{
        type:DataTypes.BOOLEAN,
        defaultValue: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id',
        },
    },
}, {
    tableName: 'shops',
    timestamps: true,
});


User.hasOne(Shop, {
    foreignKey: 'userId',
    as: 'shop',
});


Shop.belongsTo(User, {
    foreignKey: 'userId',
    as: 'owner',
});

