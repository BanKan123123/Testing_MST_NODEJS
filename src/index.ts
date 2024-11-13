import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { connect } from './config/config-connectDB';
import Routes from './router/routes';
import { authMiddleware } from './middleware/auth.middleware';

connect();

const app: Application = express();
app.use(express.json());
new Routes(app);

// CORS
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
//Testing JWT Acccess route API
app.get('/protected-route', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'You have access to this protected route.' });
});

// Checking Route exists in the APP
app.use((req: Request, res: Response) => {
    res.status(404).send({
        status: 404,
        message: 'Error, Page was not found.'
    });
});

app.listen(4001, () => {
    console.log('Connecting Server....');
});
