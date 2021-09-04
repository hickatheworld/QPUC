/**
 * A question in TLMVPSC.
 */
export default interface IQuestion {
	/**
	 * The possible answers to this question. The first one of the array is the correct answer.
	 */
	answers: string[];
	/**
	 * The MongoID of this question.
	 */
	id: string;
	/**
	 * Optionnal labels to easily identify this question or group questions.
	 */
	labels?: string[];
	/**
	 * The statement of this question.
	 */
	statement: string;
}