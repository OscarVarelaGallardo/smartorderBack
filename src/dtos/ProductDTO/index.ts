import { z } from 'zod';

export const CreateProductSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    price: z.number(),
    categoryId: z.number(),
    available: z.boolean(),
    imageUrl: z.string().url().optional(),
    preparationTimeMinutes: z.number().optional(),
});

export const GetAllProductsQuerySchema = z.object({
    category: z.string().optional(),
    available: z.preprocess(val => {
        if (val === 'true') return true;
        if (val === 'false') return false;
        return undefined;
    }, z.boolean().optional()),
});

export const GetProductByIdParamsSchema = z.object({
    id: z.string().regex(/^\d+$/, "El id debe ser un número"),
});
export const UpdateProductSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    categoryId: z.number().optional(),
    available: z.boolean().optional(),
    imageUrl: z.string().url().optional(),
    preparationTimeMinutes: z.number().optional(),
});
export const DeleteProductParamsSchema = z.object({
    id: z.string().regex(/^\d+$/, "El id debe ser un número"),
});

export type DeleteProductParams = z.infer<typeof DeleteProductParamsSchema>;
export type GetProductByIdParams = z.infer<typeof GetProductByIdParamsSchema>;
export type UpdateProductDto = z.infer<typeof UpdateProductSchema>;
export type GetAllProductsQuery = z.infer<typeof GetAllProductsQuerySchema>;
export type CreateProductDto = z.infer<typeof CreateProductSchema>;