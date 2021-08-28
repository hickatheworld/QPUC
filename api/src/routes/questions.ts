import { Request, Response, Router } from 'express';
import db from '../db';
import { IQuestion } from '../models/Question';

// Type assertion because TypeScript somehow doesn't want me to instanciate a Router.
const router = new (<any>Router)();

/**
 * /questions/get - Returns a list of questions
 * Query parameters:
 *  - (optional) labels: Labels to filter the questions, separated with commas.
 *  - (optional) limit: The maximum amount of questions to return. Defaults to 50.
 * Returns:
 * An array of IQuestion.
 */
router.get('/get', async (req: Request, res: Response) => {
	let labels: string[];
	let limit: number;
	// We can use these type assertions as these values will always be string.
	if (req.query.labels)
		labels = (<string>req.query.labels).split(',');
	if (req.query.limit)
		// If the given parameter was not a valid integer, limit must remain undefined.
		limit = parseInt(<string>req.query.limit) || undefined;
	const questions = await db.questions.fetch({ labels, limit });
	res.send(questions);
});

/**
 * /questions/add - Lets an admin add a question to the database.
 * Body: IQuestion.
 */
router.put('/add', async (req: Request, res: Response) => {
	if (!Array.isArray(req.body.answers))
		return res.send({ sucsess: false, error: '\'answers\' must be a correct array.' });
	if (typeof req.body.statement !== 'string')
		return res.send({ sucsess: false, error: '\'statement\' must be a correct string.' });
	if (!(req.body.type >= 0 && req.body.type <= 2) || !Number.isInteger(req.body.type))
		// If req.body.type is not a number, the conditions will also return false so we don't need a type check before these comparisons.
		return res.send({ sucsess: false, error: '\'type\' must be a correct integer in [0;2].' });
	if (req.body.type === 0 && req.body.answers.length !== 2)
		return res.send({ sucsess: false, error: '\'answers\' must be of length 2 if \'type\' is 0.' });
	if (req.body.type === 1 && req.body.answers.length !== 4)
		return res.send({ sucsess: false, error: '\'answers\' must be of length 4 if \'type\' is 1.' });
	if (req.body.type === 2 && req.body.answers.length !== 1)
		return res.send({ sucsess: false, error: '\'answers\' must be of length 1 if \'type\' is 2.' });
	let warn = false;
	const question: IQuestion = {
		answers: req.body.answers,
		statement: req.body.statement,
		type: req.body.type
	};
	if (req.body.labels) {
		if (Array.isArray(req.body.labels))
			question.labels = req.body.labels;
		else warn = true;
	}
	try {
		await db.questions.add(question);
		res.send(warn ? { success: true, warning: '\'labels\' is not a correct array. The questions has been added to the database with no label.' } : { success: true });
	} catch (err) {
		res.send({ success: false, error: `Internal Error: ${err.toString()}` });
	}
});

export default router;