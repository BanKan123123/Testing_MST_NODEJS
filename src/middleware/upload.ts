import { Request, Response } from 'express';
import multer, { StorageEngine } from 'multer';
import path from 'path';
import HttpStatusCode from '../utils/HttpStatusCode';

// Định nghĩa đường dẫn lưu file và tên file
const storage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file: any, cb: any) => {
        cb(null, path.join(__dirname, '../public/image')); // Đường dẫn thư mục lưu ảnh
    },
    filename: (req: Request, file: any, cb: any) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname); // Đặt tên file duy nhất
    }
});

// Cấu hình multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn kích thước file (5MB)
    fileFilter: (req: Request, file: any, cb: any) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'));
        }
    }
});

export const uploadAvatar = (req: Request, res: Response): void => {
    upload.single('avatar')(req, res, (err: any) => {
        if (err) return res.status(HttpStatusCode.BAD_REQUEST).json({ error: err.message });

        if (!req.file) {
            return res.status(HttpStatusCode.BAD_REQUEST).json({ error: 'No file uploaded' });
        }

        const imagePath = `/public/image/${req.file.filename}`;
        return res.status(HttpStatusCode.OK).send({
            message: "Upload Successful ", imagePath
        })
    })
}