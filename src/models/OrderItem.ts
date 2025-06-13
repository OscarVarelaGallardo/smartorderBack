import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { Product } from './Product';
import { Order } from './Order';

export const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    unitPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
}, {
    tableName: 'order_items',
    timestamps: false,
});

// Relaciones
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });