import {z} from 'zod';

export const CreateShopSchema = z.object({
    name: z.string(),
    address: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    userId:z.number().optional()
})
