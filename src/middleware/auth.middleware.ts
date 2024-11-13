import { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import HttpStatusCode from '../utils/HttpStatusCode';

const key = process.env.JWT_SECRET || '';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    const secretKey = process.env.JWT_SECRET || '';

    if (!token) {
        return res.status(HttpStatusCode.UNAUTHORIZED).send({ message: 'Access denined, No token provided' });
    }

    try {
        const decoded = jwt.verify(token, secretKey) as JwtPayload;
        // Kiểm tra nếu decoded là một đối tượng (JwtPayload) và chứa `id`, `email`
        if (decoded && typeof decoded && 'email' in decoded) {
            // req.user = { email: decoded.email as string };
            next();
        } else {
            return res.status(403).json({ message: 'Invalid token structure.' });
        }
    } catch (err) {
        return res.status(HttpStatusCode.FORBIDDEN).send({ message: 'Invalid or expired token' });
    }
};
