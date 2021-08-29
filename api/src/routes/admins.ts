import bcrypt from 'bcrypt';
import { Request, Response, Router } from 'express';
import db from '../db';
// Type assertion because TypeScript somehow doesn't want me to instanciate a Router.
const router = new (<any>Router)();

/**
 * /admins/add - Adds an admin to the database.
 * Body:
 *  - username: The admin's username
 *  - password: The admin's password.
 * Returns:
 *  Object:
 *   - success: boolean, whether the admin has sucessfully been added.
 *   - error: optional string, the reason why the admin has not sucessfully been added.
 */
router.put('/add', async (req: Request, res: Response) => {
	let { username, password }: Record<string, string> = req.body;
	if (!username)
		return res.send({ success: false, error: 'Must provide a \'username\'.' });
	username = username.trim();
	if (username.length < 3)
		return res.send({ success: false, error: '\'username\' must be at least 3 characters long.' });
	if (!password)
		return res.send({ success: false, error: 'Must provide a \'password\'.' });
	if (password.length < 8)
		return res.send({ success: false, error: '\'password\' must be at least 8 characters long.' });
	if (await db.admins.exists(username))
		return res.send({ success: false, error: `The username '${username}' is already taken.` });
	bcrypt.genSalt((err, salt) => {
		if (err)
			return res.send({ success: false, error: `bcrypt error: [${err.name}] ${err.message}` });
		bcrypt.hash(password, salt, async (err, hash) => {
			if (err)
				return res.send({ success: false, error: `bcrypt error: [${err.name}] ${err.message}` });
			await db.admins.add({ username, password: hash });
			res.send({ success: true });
		});
	});
});

export default router;