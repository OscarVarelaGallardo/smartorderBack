import {z} from 'zod';

export const CreateShopSchema = z.object({
    name: z.string(),
    address: z.string(),
    latitude: z.string(),
    longitude: z.string(),
    userId:z.string().optional()
})