// models/Feedback.ts
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import { User } from './User';
import { Product } from './Product';

export const Feedback = sequelize.define('Feedback', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        }
    }
}, {
    tableName: 'feedbacks',
    timestamps: true,
});

// Relaciones
User.hasMany(Feedback, { foreignKey: 'userId' });
Feedback.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(Feedback, { foreignKey: 'productId' });
Feedback.belongsTo(Product, { foreignKey: 'productId' });