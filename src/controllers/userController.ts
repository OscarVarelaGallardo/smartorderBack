import {Request, Response} from 'express';

import {User} from '../models/User'; // ajusta la ruta si es necesario
import bcrypt from 'bcrypt';

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const {email, password} = req.body;

    if (!email || !password) {
        res.status(400).json({message: 'Email y contraseña son obligatorios.'});
        return;
    }

    try {
        const existingUser = await User.findOne({where: {email}});
        if (existingUser) {
            res.status(409).json({message: 'El usuario ya existe.'});
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            roleId: 2,
        });

        res.status(201).json({message: 'User created successfully', user: newUser});
    } catch (error) {
        res.status(500).json({message: 'Error on server  to created  user.', error});
        return
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
    const {id} = req.params;
    if (!id) {
        return res.status(400).json({message: 'Id is required.'});
    }

    try {
        const user = await User.findByPk(id)
        const isActive = false
        if (user) {
            user.set('isActive', isActive)
            user.save()
            res.status(201).json({message: 'User deleted successfully'});
            return
        }

    } catch (error) {
        return res.status(400).json(error)
    }
}