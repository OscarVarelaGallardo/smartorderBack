import {Request, Response} from 'express';

import {User} from '../models/User';
import {Shop} from "../models/Shop";
import bcrypt from 'bcrypt';
import {CreateUserSchema, GetUserByIdParamsSchema, UpdateUserSchema} from "../dto/UserDTO";

export const createUser = async (req: Request, res: Response): Promise<any> => {
    const parseResult = CreateUserSchema.safeParse(req.body);
    if (!parseResult.success) {
        res.status(400).json({errors: parseResult.error.errors});
        return
    }
    try {
        const {email, password} = parseResult.data
        const existingUser = await User.findOne({where: {email}});
        if (existingUser) {
            res.status(409).json({message: 'User already exists with this email.'});
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            email,
            password: hashedPassword,

        });
        res.status(201).json({message: 'User created successfully'});
        return
    } catch (error) {
        res.status(500).json({message: 'Error on server  to created  user.', error});
        return
    }
};

export const getAllUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const allUser = await User.findAll({
            where: {isActive: true}
        })
        res.status(200).json(allUser)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const updateUser = async (req: Request, res: Response): Promise<any> => {

    const parseResult = GetUserByIdParamsSchema.safeParse(req.params);
    const parseResultBody = UpdateUserSchema.safeParse(req.body);

    if (!parseResult.success || !parseResultBody) {
        res.status(400).json({errors: parseResult.error.errors});
        return
    }
    const {id} = parseResult.data
    const {email, password, isActive} = parseResultBody.data

    try {
        const user = await User.findByPk(id)
        if (user) {
            const hashedPassword = await bcrypt.hash(password, 10);

            await user.update({email, password: hashedPassword, isActive})
            return res.status(201).json({message: 'User update successfully'});

        } else {
            return res.status(500).json({message: 'Sometime wrong updating user'});

        }
    } catch (error) {
        return res.status(500).json({message: 'Error on server  to created  user.', error});

    }

}

export const getUserById = async (req: Request, res: Response): Promise<any> => {
    const parseResult = GetUserByIdParamsSchema.safeParse(req.params);
    if (!parseResult.success) {
        res.status(400).json({errors: parseResult.error.errors});
        return
    }
    const {id} = parseResult.data;
    try {
        const user = await User.findAll({
            where: {
                id: id,
                isActive: true
            },
            attributes: {exclude: ['password', 'createdAt', 'updatedAt', 'roleId', 'id']},
            include: [{
                model: Shop,
                as: 'shop',
                attributes: {exclude: ['createdAt', 'updatedAt', 'userId', 'id']}
            }]
        })
        res.status(200).json(user)
        return
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
    const parseResult = GetUserByIdParamsSchema.safeParse(req.params);
    if (!parseResult.success) {
        res.status(400).json({errors: parseResult.error.errors});
        return
    }
    const {id} = parseResult.data;

    try {
        const user = await User.findByPk(id)
        if (user) {
            user.set('isActive', false)
            user.save()
            res.status(201).json({message: 'User deleted successfully'});
            return
        }

    } catch (error) {
        return res.status(400).json(error)
    }
}