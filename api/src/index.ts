import express, { Request, Response } from 'express';
import db from './db';
import authMiddle from './middleware/auth';
import logMiddle from './middleware/log';
import adminsRoutes from './routes/admins';
import questionsRoutes from './routes/questions';
require('dotenv').config();

const server = express();
server.use(express.json());
server.use(logMiddle);
server.use(authMiddle);
server.use('/admins', adminsRoutes);
server.use('/questions', questionsRoutes);

db.connect(process.env.MONGO_URI).then(() => {
	server.listen(process.env.PORT, () => console.log(`API Server listening on :${process.env.PORT}`));
});