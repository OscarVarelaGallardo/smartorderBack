import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { Category } from './Category';

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
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories', // nombre de la tabla referida
            key: 'id'
        }
    }
}, {
    tableName: 'products',
    timestamps: true
});

// Relaciones
Product.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'category',
});

Category.hasMany(Product, {
    foreignKey: 'categoryId',
    as: 'products',
});