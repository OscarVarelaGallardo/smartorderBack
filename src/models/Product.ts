import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db'; // Asegúrate de usar tu instancia correcta

export const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    preparationTimeMinutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'products', // Nombre de la tabla en la base de datos
    timestamps: false      // Desactiva createdAt / updatedAt
});