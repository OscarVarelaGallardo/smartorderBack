import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize('smartorderdb', 'postgres', 'postgres', {
    host: 'localhost', // tu app accede al contenedor por el puerto publicado
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