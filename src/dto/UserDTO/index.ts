import { z} from 'zod'

export const CreateUserSchema = z.object({
    email:z.string().email(),
    password:z.string(),
    roleId:z.number().optional()
})

export const GetUserByIdParamsSchema = z.object({
    id: z.string().regex(/^\d+$/, "El id debe ser un número"),
});

export const UpdateUserSchema = z.object({
    email:z.string().email(),
    password:z.string(),
    roleId:z.number().optional(),
    isActive:z.boolean().optional()
})