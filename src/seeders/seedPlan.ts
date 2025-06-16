// seeders/planSeeder.ts
import { Plan } from '../models/Plan';

const seedPlans = async () => {
    await Plan.bulkCreate([
        {
            name: 'Básico',
            price: 1500.00,
            description: 'Admin panel, menú, pedidos, sin pago en línea',
            features: {
                adminPanel: true,
                orders: true,
                onlinePayment: false,
                mobileApp: false
            }
        },
        {
            name: 'Pro',
            price: 2500.00,
            description: 'Pagos integrados, soporte técnico, dominio personalizado',
            features: {
                adminPanel: true,
                orders: true,
                onlinePayment: true,
                techSupport: true,
                customDomain: true,
                mobileApp: false
            }
        },
        {
            name: 'Premium',
            price: 3500.00,
            description: 'App móvil, personalización avanzada, reportes, WhatsApp',
            features: {
                adminPanel: true,
                orders: true,
                onlinePayment: true,
                techSupport: true,
                customDomain: true,
                mobileApp: true,
                advancedCustomization: true,
                reports: true,
               // whatsappIntegration: true
            }
        }
    ]);
};

seedPlans();