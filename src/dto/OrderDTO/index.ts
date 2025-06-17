import { z } from 'zod';

// Example Order type
export const GetAllOrderQuerySchema = z.object({
    category: z.string().optional(),
    available: z.preprocess(val => {
        if (val === 'true') return true;
        if (val === 'false') return false;
        return undefined;
    }, z.boolean().optional()),
});

export const CreateOrderSchema = z.object({
    numberTable: z.string().min(1, 'El número de mesa es obligatorio'),
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
    product: z.array(z.object({
        productId: z.number().int().positive('El ID del producto debe ser un número positivo'),
        quantity: z.number().int().positive('La cantidad debe ser un número positivo'),
        unitPrice: z.number().positive('El precio unitario debe ser un número positivo').optional(),
    })).nonempty('Debe haber al menos un artículo en el pedido'),

});

export type GetAllOrderQuery = z.infer<typeof GetAllOrderQuerySchema>;
export type CreateOrder = z.infer<typeof CreateOrderSchema>;    