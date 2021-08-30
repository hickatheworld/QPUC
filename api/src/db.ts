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
	 * Deletes a question from the database.
	 * @param id The MongoID of the quesiton to delete.
	 * @returns Whether a question has been deleted.
	 */
	async delete(id: string): Promise<boolean> {
		try {
			const result = await QuestionModel.deleteOne({ _id: id });
			return result.deletedCount > 0;
		} catch (err) {
			return false;
		}
	},
	/**
	 * Edits a question.
	 * @param id The MongoID of the question to edit.
	 * @param edits The changes to apply to the question.
	 * @returns Whether a question has sucessfully been edited.
	 */
	async edit(id: string, edits: Partial<IQuestion>): Promise<boolean> {
		// If an id was passed in edits, we make sure not to pass it in the update query.
		delete edits.id;
		try {
			const result = await QuestionModel.updateOne({ _id: id }, edits);
			return result.nModified > 0;
		} catch (err) {
			return false;
		}
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
		// This gets rid of unwanted MongoDB properties.
		return docs.map(({ answers, _id, labels, statement, type }) => ({ answers, id: _id.toString(), labels, statement, type }));
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