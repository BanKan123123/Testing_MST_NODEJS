import { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import HttpStatusCode from '../utils/HttpStatusCode';

const key = process.env.JWT_SECRET || '';

export const authMiddleware = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(HttpStatusCode.UNAUTHORIZED).send({ message: 'Access denined, No token provided' });
        }

        try {
            jwt.verify(token, key, (err, decode) => {
                if (err) {
                    return res.status(HttpStatusCode.FORBIDDEN).send({ message: "Invalid token" })
                }

                const user = decode as { email: string, role: string };

                if (!roles.includes(user.role)) {
                    return res.status(HttpStatusCode.FORBIDDEN).send({ message: 'You do not have permission to access this resource' });
                }
            })
            next();
        } catch (err) {
            return res.status(HttpStatusCode.FORBIDDEN).send({ message: 'Invalid or expired token' });
        }
    }
};
