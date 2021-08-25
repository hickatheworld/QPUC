import express, { Request, Response } from 'express';
import db from './db';
import adminRoutes from './routes/admin';
import questionsRoutes from './routes/questions';
require('dotenv').config();

const server = express();
server.use(express.json());

server.use('/admin', adminRoutes);
server.use('/questions', questionsRoutes);

db.connect(process.env.MONGO_URI).then(() => {
	server.listen(process.env.PORT, () => console.log(`API Server listening on :${process.env.PORT}`));
});