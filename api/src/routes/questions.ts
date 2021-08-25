import { Request, Response, Router } from 'express';
import db from '../db';
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
	const questions = await db.fetchQuestions({ labels, limit });
	res.send(questions);
});

export default router;