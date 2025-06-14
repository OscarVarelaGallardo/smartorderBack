import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { Order } from './Order';

export const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    method: {
        type: DataTypes.ENUM('CARD', 'CASH'),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('PENDING', 'COMPLETED', 'FAILED'),
        defaultValue: 'PENDING',
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    stripePaymentIntentId: {
        type: DataTypes.STRING,
        allowNull: true, // Solo si es tarjeta
    }
}, {
    tableName: 'payments',
    timestamps: true
});

// Relación con orden
Payment.belongsTo(Order, { foreignKey: 'orderId' });
Order.hasOne(Payment, { foreignKey: 'orderId' });