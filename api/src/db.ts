import mongoose, { FilterQuery } from 'mongoose';
import { IQuestion, QuestionModel } from './models/Question';

/**
 * Utility class containing database interaction methods.
 */
class Database {
	/**
	 * Connectes mongoose to the database.
	 * @param uri The connection URI to the database.
	 */
	async connect(uri: string): Promise<void> {
		return void await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
	}

	/**
	 * Fetches questions form the database.
	 * @param options 
	 */
	async fetchQuestions(options?: FetchQuestionsOptions): Promise<void> {
		const filter: FilterQuery<IQuestion> =
			(options && options.labels)
				? { labels: { $all: options.labels } } // Only entries with all the specified labels will be returned.
				: {};
		const query = QuestionModel.find(filter);
		if (options && options.limit)
			query.limit(Math.max(1, options.limit)); // Makes sure a decent limit is specified.
		const docs = await query.exec();
		// This gets rid of MongoDB properties.
		return docs.map(({ answers, labels, statement }) => ({ answers, labels, statement }));
	}

	async addQuestion(question: IQuestion): Promise<void> {
		return void QuestionModel.create(question);
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