import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import db from '../db';

// Authentication middleware
// Every request to TLMVPSC API requires an Authorization header in the form of `username:password`.
export default async function(req: Request, res: Response, next: Function): Promise<void> {
	const { authorization } = req.headers;
	res.status(400);
	if (!authorization)
		return void res.send({ success: false, error: 'Invalid request, must contain an Authorization header.' });
	// We don't use String.split because password may contain a : character. This method has also better performances.
	const index = authorization.indexOf(':');
	if (index < 0)
		return void res.send({ success: false, error: 'Authorization header must be in the form of \'username:password\'' });
	const username = authorization.substring(0, index);
	const password = authorization.substring(index + 1);
	const admin = await db.admins.get(username);
	res.status(401);
	if (!admin)
		return void res.send({ success: false, error: `Admin ${username} does not exist.` });
	const valid = await bcrypt.compare(password, admin.password);
	if (!valid)
		return void res.send({ success: false, error: `Invalid password.` });
	next();
}