// src/seeders/seedRoles.ts
import { Role } from '../models/Role';
import { sequelize } from '../config/db';

const seedRoles = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conectado a la base de datos.');

        const roles = ['admin', 'store', 'customer'];

        for (const roleName of roles) {
            await Role.findOrCreate({
                where: { name: roleName },
            });
        }

        console.log('Roles insertados correctamente.');
        process.exit(0); // Finaliza el script
    } catch (error) {
        console.error('Error insertando roles:', error);
        process.exit(1);
    }
};

seedRoles();