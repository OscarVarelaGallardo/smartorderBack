
import {z} from 'zod';

export const CreateSuscriptionSchema = z.object({
    userId: z.number(),
    planId: z.number(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    paymentMethod: z.string().optional(),
    status: z.enum(['active', 'cancelled', 'trialing']).optional(),
    
});
export const GetSuscriptionByUserIdParamsSchema = z.object({
    userId: z.string().regex(/^\d+$/, "El id debe ser un número"),
});
export const UpdateSuscriptionSchema = z.object({
    userId: z.number().optional(),
    planId: z.number().optional(),
    status: z.enum(['active', 'cancelled', 'trialing']).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    paymentMethod: z.string().optional(),
});
export const GetSuscriptionByIdParamsSchema = z.object({
    id: z.string().regex(/^\d+$/, "El id debe ser un número"),
});
export const DeleteSuscriptionByIdParamsSchema = z.object({
    id: z.string().regex(/^\d+$/, "El id debe ser un número"),
});
export const GetAllSuscriptionsSchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    status: z.enum(['active', 'cancelled', 'trialing']).optional(),
    userId: z.string().regex(/^\d+$/, "El id debe ser un número").optional(),
    planId: z.string().regex(/^\d+$/, "El id debe ser un número").optional(),
});
export const GetSuscriptionByUserIdSchema = z.object({
    userId: z.string().regex(/^\d+$/, "El id debe ser un número"),
});