import express, { Request, Response } from 'express';
import db from './db';
require('dotenv').config();

const server = express();

db.connect(process.env.MONGO_URI).then(() => {
	server.listen(process.env.PORT, () => console.log(`API Server listening on :${process.env.PORT}`));
});