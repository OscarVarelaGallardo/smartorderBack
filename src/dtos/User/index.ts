import {object, z} from 'zod'

export const CreateUserSchema = z.object({
    email:z.string().email(),
    password:z.string(),
    roleId:z.number().optional()
})