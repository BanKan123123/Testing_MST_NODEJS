import { Router } from 'express';
import AuthController from '../controller/auth.controller';

class AuthRouter {
    router = Router();
    controller = new AuthController();

    constructor() {
        this.initialize();
    }

    initialize() {
        this.router.post('/login', this.controller.login);
        this.router.post('/register', this.controller.register);
    }
}

export default new AuthRouter().router;
