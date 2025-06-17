import { z } from 'zod'

export const CreatePlanSchema = z.object({
    name: z.string(),
    price: z.union([z.number(), z.string()]),
    description: z.string(),
    features: z.array(z.string()).optional(),
})
export const GetPlanByIdParamsSchema = z.object({
    id: z.string().regex(/^\d+$/, "El id debe ser un número"),
});
      
