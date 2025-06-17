
import {Response, Request} from "express";
import { LoginSchema } from '../dtos/Login'; // Ajusta la ruta si es diferente
import { User } from '../models/User'; // Ajusta según cómo importes tu modelo
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export const login = async (req: Request, res: Response):Promise<any> => {
    const result = LoginSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ message: 'Datos inválidos', errors: result.error.errors });
    }
    const { email, password } = result.data;
    try {
        let user = await User.findOne({ where: { email, isActive: true } });
        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado o inactivo' });
        }
        // @ts-ignore
        const isPasswordValid = await bcrypt.compare(password, user.get('password'));
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // @ts-ignore
        const token =  jwt.sign(
            {  email: user.get('email')},
            JWT_SECRET,
            { expiresIn: '2h' }
        );

        return res.status(200).json({
            token,
        });

    } catch (error) {
        console.error('Error en login:', error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};