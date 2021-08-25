import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import db from './db';
require('dotenv').config();

const server = express();
server.use(express.json());

/**
 * /questions/get - Returns a list of questions
 * Query parameters:
 *  - (optional) labels: Labels to filter the questions, separated with commas.
 *  - (optional) limit: The maximum amount of questions to return. Defaults to 50.
 * Returns:
 * An array of IQuestion.
 */
server.get('/questions/get', async (req: Request, res: Response) => {
	let labels: string[];
	let limit: number;
	// We can use these type assertions as these values will always be string.
	if (req.query.labels)
		labels = (<string>req.query.labels).split(',');
	if (req.query.limit)
		// If the given parameter was not a valid integer, limit must remain undefined.
		limit = parseInt(<string>req.query.limit) || undefined;
	const questions = await db.fetchQuestions({ labels, limit });
	res.send(questions);
});

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
server.put('/admin/add', async (req: Request, res: Response) => {
	let { username, password }: Record<string, string> = req.body;
	console.log(req.body);
	if (!username)
		return res.send({ success: false, error: 'Must provide a \'username\'.' });
	username = username.trim();
	if (username.length < 3)
		return res.send({ success: false, error: '\'username\' must be at least 3 characters long.' });
	if (!password)
		return res.send({ success: false, error: 'Must provide a \'password\'.' });
	if (password.length < 8)
		return res.send({ success: false, error: '\'password\' must be at least 8 characters long.' });
	if (await db.existsAdmin(username))
		return res.send({ success: false, error: `The username '${username}' is already taken.` });
	bcrypt.genSalt((err, salt) => {
		if (err)
			return res.send({ success: false, error: `bcrypt error: [${err.name}] ${err.message}` });
		bcrypt.hash(password, salt, async (err, hash) => {
			if (err)
				return res.send({ success: false, error: `bcrypt error: [${err.name}] ${err.message}` });
			await db.addAdmin({ username, password: hash });
			res.send({ sucess: true });
		});
	});
});

db.connect(process.env.MONGO_URI).then(() => {
	server.listen(process.env.PORT, () => console.log(`API Server listening on :${process.env.PORT}`));
});