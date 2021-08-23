import mongoose from 'mongoose';
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
		await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
	}

	/**
	 * Fetches questions form the database.
	 */
	async fetchQuestions(options?: FetchQuestionsOptions): Promise<IQuestion[]> {
		//TODO later lol
	}
}

/**
 * Options to narrow questions fetching results.
 */
interface FetchQuestionsOptions {
	/**
	 * The labels to filter
	 */
	labels?: string[]
	limit?: number;
}

export database;