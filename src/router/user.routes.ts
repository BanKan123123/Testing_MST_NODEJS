import { Router } from "express";
import UserController from "../controller/user.controller";
import { uploadAvatar } from "../middleware/upload";
import { authMiddleware } from "../middleware/auth.middleware";

class UserRoutes {
    router = Router()
    controller = new UserController();

    constructor() {
        this.initialize();
    }

    initialize() {
        this.router.get('/:email', authMiddleware(['admin', 'creator', 'member']), this.controller.getUserProfile);

        this.router.post('/login', this.controller.login);

        this.router.post('/register', this.controller.addUser);

        this.router.put("/update-profile/:id", authMiddleware(['admin', 'creator', 'member']), this.controller.updateUser);

        this.router.patch('/update-expertise/:id', authMiddleware(['admin', 'creator', 'member']), this.controller.updateExpretise);

        this.router.patch('/update-password/:id', authMiddleware(['admin', 'creator', 'member']), this.controller.updatePassword);

        this.router.patch('/update-avatar/:id', authMiddleware(['admin', 'creator', 'member']), this.controller.updateAvatar);

        this.router.post("/upload-avatar", authMiddleware(['admin', 'creator', 'member']), uploadAvatar);
    }
}

export default new UserRoutes().router;



