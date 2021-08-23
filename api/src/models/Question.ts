import { Schema, model } from 'mongoose';

/**
 * A question in QPUC.
 */
export interface IQuestion {
	/**
	 * The possible answers to this question. The first one of the array is the correct answer.
	 */
	answers: string[];
	/**
	 * Optionnal labels to easily identify this question or group questions.
	 */
	labels?: string[];
	/**
	 * The statement of this question.
	 */
	statement: string;
	/**
	 * The type of this question:
	 * 0 - Duo: The player is given 2 possible answers and must choose one of them.
	 * 1 - Square: The player is given 4 possible answers and must choose one of them.
	 * 2 - Cash: The player is given no possible answer.
	 */
	type: Number;
}

const QuestionSchema = new Schema<IQuestion>({
	answers: {
		required: true,
		type: [String]
	},
	label: [String],
	statement: {
		required: true,
		type: String
	},
	type: {
		required: true,
		type: Number
	}
});

export const QuestionModel = model('question', QuestionSchema);