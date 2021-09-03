import express, { Request, Response } from 'express';
import db from './db';
import authMiddle from './middleware/auth';
import logMiddle from './middleware/log';
import adminsRoutes from './routes/admins';
import questionsRoutes from './routes/questions';
import cors from 'cors';
require('dotenv').config();

const server = express();
server.use(cors());
server.use(express.json());
server.use(logMiddle);
server.use(authMiddle);
server.use('/admins', adminsRoutes);
server.use('/questions', questionsRoutes);

/**
 * / - Endpoint just to check if given credentials are valid.
 */
server.get('/', (req: Request, res: Response) => {
	res.send({ success: true });
});

db.connect(process.env.MONGO_URI).then(() => {
	server.listen(process.env.PORT, () => console.log(`API Server listening on :${process.env.PORT}`));
});