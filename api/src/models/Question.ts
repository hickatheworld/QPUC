import { Schema, model } from 'mongoose';

/**
 * A question in TLMVPSC.
 */
export interface IQuestion {
	/**
	 * The possible answers to this question. The first one of the array is the correct answer.
	 */
	answers: string[];
	/**
	 * The MongoID of this question.
	 */
	id?: string;
	/**
	 * Optionnal labels to easily identify this question or group questions.
	 */
	labels?: string[];
	/**
	 * The statement of this question.
	 */
	statement: string;
}

const QuestionSchema = new Schema<IQuestion>({
	answers: {
		required: true,
		type: [String]
	},
	labels: [String],
	statement: {
		required: true,
		type: String
	}
});

export const QuestionModel = model('question', QuestionSchema);