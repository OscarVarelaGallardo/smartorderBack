import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize('smartorderdb', 'postgres', 'postgres', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false, // 👈 Esto silencia los logs SQL
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});