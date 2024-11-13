import { NextFunction, Request, Response } from 'express';
import UserModel from '../model/user.model';
import HttpStatusCode from '../utils/HttpStatusCode';
import { comparePassword, cryptPassword } from '../utils/cryptPassword';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        const key = process.env.JWT_SECRET || '';
        //get User
        try {
            const user = await UserModel.findOne({ email: req.body.email });
            if (!user) {
                return res.status(HttpStatusCode.UNAUTHORIZED).send({ message: 'User not found' });
            }

            comparePassword(req.body.password, user.password, (err) => {
                if (err) return res.status(HttpStatusCode.UNAUTHORIZED).send({ message: 'Invalid password' });

                const token = jwt.sign({ email: user.email }, key, { expiresIn: '1h' });

                res.status(HttpStatusCode.OK).send({
                    user,
                    token
                });
            });
        } catch (err) {
            next(err);
        }
    }

    async register(req: Request, res: Response, next: NextFunction) {
        const key = process.env.JWT_SECRET || '';
        //Retrive User from body
        const user = new UserModel(req.body);

        const userChecked = await UserModel.findOne({ email: user.email });

        if (userChecked) {
            return res.status(HttpStatusCode.BAD_REQUEST).send({ message: 'User already' });
        }

        // Bcrypt password;
        cryptPassword(user.password, (err, hash) => {
            if (err) return res.status(HttpStatusCode.BAD_REQUEST).send({ error: 'Error encripting password' });

            user.password = hash;
            //Push user into database

            const token = jwt.sign({ email: user.email }, key, { expiresIn: '1h' });
            user.save()
                // Return the saved user;
                .then(() =>
                    res.status(HttpStatusCode.OK).send({
                        user,
                        token
                    })
                )
                .catch((err) => {
                    res.status(HttpStatusCode.BAD_REQUEST).send({ err });
                });
        });
    }
}

export default AuthController;
