import mongoose, { FilterQuery } from 'mongoose';
import { AdminModel, IAdmin } from './models/Admin';
import { IQuestion, QuestionModel } from './models/Question';

/**
 * Utility class containing database interaction methods.
 */
class Database {
	/**
	 * Admin manipulation methods.
	 */
	admins = admins;
	/**
	 * Question manipulation methods.
	 */
	questions = questions;
	/**
	 * Connectes mongoose to the database.
	 * @param uri The connection URI to the database.
	 */
	async connect(uri: string): Promise<void> {
		return void await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
	}

}


const admins = {
	/**
	 * Adds an admin to the database.
	 * @param admin The admin's credentials.
	 */
	async add(admin: IAdmin): Promise<void> {
		return void AdminModel.create(admin);
	},
	/**
	 * Checks if an admin exists with a given username.
	 * @param username The username to test
	 */
	async exists(username: string): Promise<boolean> {
		return AdminModel.exists({ username });
	},
	/**
	 * Gets an admin from the database.
	 */
	async get(username: string): Promise<IAdmin | undefined> {
		const doc = await AdminModel.findOne({ username });
		if (!doc)
			return;
		return { username: doc.username, password: doc.password };
	}
}

/**
 * Question manipulation methods.
 */
const questions = {
	/**
	 * Adds a question to the database.
	 */
	async add(question: IQuestion): Promise<void> {
		return void QuestionModel.create(question);
	},
	/**
	 * Fetches questions form the database.
	 */
	async fetch(options?: FetchQuestionsOptions): Promise<IQuestion[]> {
		const filter: FilterQuery<IQuestion> =
			(options && options.labels)
				? { labels: { $all: options.labels } } // Only entries with all the specified labels will be returned.
				: {};
		const query = QuestionModel.find(filter);
		if (options && options.limit)
			query.limit(Math.max(1, options.limit)); // Makes sure a decent limit is specified.
		const docs = await query.exec();
		// This gets rid of MongoDB properties.
		return docs.map(({ answers, labels, statement, type }) => ({ answers, labels, statement, type }));
	}
}

/**
 * Options to narrow questions fetching results.
 */
interface FetchQuestionsOptions {
	/**
	 * The labels to search for. Only questions that have these labels will be returned.
	 */
	labels?: string[]
	/**
	 * The maximum amount of questions to return.
	 */
	limit?: number;
}

// We need only one database connection.
export default new Database();