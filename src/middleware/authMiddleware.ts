import {Request, Response, NextFunction,  RequestHandler} from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

interface JwtPayload {
    id: number;
    email: string;
    role: number;
}

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

const authToken: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
         res.status(401).json({message: 'Token no proporcionado'});
        return
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.user = decoded;
        next();

    } catch (err) {
         res.status(401).json({message: 'Token inválido o expirado'});
        return
    }
};

export default authToken