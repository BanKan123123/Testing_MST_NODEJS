import { NextFunction, Request, Response } from "express";
import UserManaModel from '../model/usermana.model';
import HttpStatusCode from "../utils/HttpStatusCode";
import { comparePassword, cryptPassword } from "../utils/cryptPassword";
import jwt from 'jsonwebtoken';

class UserController {

    async getUserProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await UserManaModel.findOne({ email: req.params.email });
            if (!user) {
                return res.status(HttpStatusCode.UNAUTHORIZED).send({ message: 'User not found' });
            }
            return res.status(HttpStatusCode.OK).send({ user });
        } catch (err) {
            next(err);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const key = process.env.JWT_SECRET || '';
        try {
            // Tìm người dùng theo email
            const user = await UserManaModel.findOne({ email: req.body.email });
            if (!user) {
                return res.status(HttpStatusCode.UNAUTHORIZED).send({ message: 'User not found' });
            }

            // So sánh mật khẩu
            const isPasswordValid = await comparePassword(req.body.password, user.password);
            if (!isPasswordValid) {
                return res.status(HttpStatusCode.UNAUTHORIZED).send({ message: 'Invalid password' });
            }

            //Update User LastLOginAt;

            user.lastLoginAt = new Date();
            await user.save();

            // Tạo JWT token nếu mật khẩu hợp lệ

            const token = jwt.sign({ email: user.email, fullName: user.fullName, phone: user.phone, avatar: user.avatar, bio: user.bio, expertise: user.expertise, experience: user.experience, role: user.role, status: user.status }, key, { expiresIn: '1h' });

            res.status(HttpStatusCode.OK).send({
                user,
                token
            });
        } catch (err) {
            next(err);
        }
    }
    async addUser(req: Request, res: Response, next: NextFunction) {
        const key = process.env.JWT_SECRET || '';
        try {
            const user = new UserManaModel(req.body);

            const userCheckek = await UserManaModel.findOne({ email: user.email });

            if (userCheckek) {
                return res.status(HttpStatusCode.BAD_REQUEST).send({ message: 'User already' });
            }
            cryptPassword(user.password, (err, hash) => {
                if (err) return res.status(HttpStatusCode.BAD_REQUEST).send({ error: 'Error encripting password' });

                user.password = hash;
                //Push user into database

                const token = jwt.sign({ email: user.email, fullName: user.fullName, phone: user.phone, avatar: user.avatar, bio: user.bio, expertise: user.expertise, experience: user.experience, role: user.role, status: user.status }, key, { expiresIn: '1h' });
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

        } catch (err) {
            next(err);
        }
    }

    async updateUser(req: Request, res: Response) {
        const userChecked = await UserManaModel.findOne({ _id: req.params.id });

        if (!userChecked) {
            return res.status(HttpStatusCode.BAD_REQUEST).send({ message: 'User have not exists' });
        }
        UserManaModel.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.status(HttpStatusCode.OK).send({
                message: "User successfully updated"
            }))
            .catch(err => {
                res.status(HttpStatusCode.BAD_REQUEST).send({ err });
            })
    }

    updateExpretise(req: Request, res: Response) {
        UserManaModel.updateOne({ _id: req.params.id }, { expertise: req.body.expertise })
            .then(() => res.status(HttpStatusCode.OK).send({
                message: "User successfully updated Expertise"
            }))
            .catch(err => {
                res.status(HttpStatusCode.BAD_REQUEST).send({ err });
            })
    }

    updatePassword(req: Request, res: Response) {
        cryptPassword(req.body.password, (err, hash) => {
            if (err) return res.status(HttpStatusCode.BAD_REQUEST).send({ error: 'Error encripting password' });
            UserManaModel.updateOne({ _id: req.params.id }, { password: hash })
                .then(() => res.status(HttpStatusCode.OK).send({
                    message: "User successfully updated password"
                }))
                .catch(err => {
                    res.status(HttpStatusCode.BAD_REQUEST).send({ err });
                })
        });
    }

    async updateAvatar(req: Request, res: Response) {
        const userChecked = await UserManaModel.findOne({ _id: req.params.id });

        if (!userChecked) {
            return res.status(HttpStatusCode.BAD_REQUEST).send({ message: 'User have not exists' });
        }
        UserManaModel.updateOne({ _id: req.params.id }, { avatar: req.body.avatar })
            .then(() => res.status(HttpStatusCode.OK).send({
                message: "User successfully updated Avatar"
            }))
            .catch(err => {
                res.status(HttpStatusCode.BAD_REQUEST).send({ err });
            })
    }

}


export default UserController;