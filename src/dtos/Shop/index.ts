import {z} from 'zod';

export const CreateShopSchema = z.object({
    name: z.string(),
    address: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    userId:z.number().optional()
})


export const GetShopByIdParamsSchema = z.object({
    id: z.string().regex(/^\d+$/, "El id debe ser un número"),
});