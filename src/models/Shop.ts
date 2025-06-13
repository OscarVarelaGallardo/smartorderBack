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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
}, {
    tableName: 'shops',
    timestamps: true,
});

// Un usuario puede tener una tienda
User.hasOne(Shop, {
    foreignKey: 'userId',
    as: 'shop',
});

// Una tienda pertenece a un usuario
Shop.belongsTo(User, {
    foreignKey: 'userId',
    as: 'owner',
});

