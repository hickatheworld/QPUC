import { Schema, model } from 'mongoose';

/**
 * A question in QPUC.
 */
interface Question {
	/**
	 * The possible answers to this question. The first one of the array is the correct answer.
	 */
	answers: string[];
	/**
	 * Optionnal labels to easily identify this question or group questions.
	 */
	label?: string[];
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

const Question = new Schema<Question>({
	answers: [String],
	label: [String],
	statement: String,
	type: Number
});

export default model('question', Question);