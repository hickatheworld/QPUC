import React, { useRef } from 'react';
import IQuestion from '../../types/IQuestion';
import '../../style/QuestionEditor.css';
import DialogBox from '../common/DialogBox';

function QuestionEditor(props: QuestionEditorProps): React.ReactElement {
	const statementRef = useRef<HTMLInputElement>(null);
	const a1Ref = useRef<HTMLInputElement>(null);
	const a2Ref = useRef<HTMLInputElement>(null);
	const a3Ref = useRef<HTMLInputElement>(null);
	const a4Ref = useRef<HTMLInputElement>(null);
	const labelsRef = useRef<HTMLInputElement>(null);
	const parseValues = () => {
		const statement = statementRef.current?.value as string;
		const a1 = a1Ref.current?.value;
		const a2 = a2Ref.current?.value;
		const a3 = a3Ref.current?.value;
		const a4 = a4Ref.current?.value;
		const label = labelsRef.current?.value.trim() as string;
		if ([statement, a1, a2, a3, a4].some(v => !v))
			return;
		let labels;
		if (label)
			labels = label.split(',').map(v => v.trim()).filter(v => !!v);
		return { statement, answers: ([a1, a2, a3, a4] as string[]), labels };
	}
	const add = () => {
		const question = parseValues();
		if (question)
			props.add(question);
	}
	const edit = () => {
		const question = parseValues();
		if (question)
			props.edit({ ...question, id: props.question?.id });
	}
	return (
		<DialogBox
			title={props.mode == 'create' ? 'Ajouter une question' : 'Éditer une question'}
			visible={props.mode !== 'hidden'}
			className='question-editor'
			onClose={props.close}
		>
			<div className='question-editor-form'>
				<div className='question-editor-form-title'>Question</div>
				<input type='text' name='statement' autoComplete='off' placeholder='Quelle est la recette des pâtes ?' ref={statementRef} defaultValue={props.question?.statement} />
				<div className='question-editor-form-title'>Réponses</div>
				<div className='question-editor-answers'>
					<div>
						<input type='text' name='a1' autoComplete='off' ref={a1Ref} placeholder='Réponse 1 (bonne réponse)' defaultValue={props.question && props.question.answers[0]} />
						<input type='text' name='a2' autoComplete='off' ref={a2Ref} placeholder='Réponse 2' defaultValue={props.question && props.question.answers[1]} />
					</div>
					<div>
						<input type='text' name='a3' autoComplete='off' ref={a3Ref} placeholder='Réponse 3' defaultValue={props.question && props.question.answers[2]} />
						<input type='text' name='a4' autoComplete='off' ref={a4Ref} placeholder='Réponse 4' defaultValue={props.question && props.question.answers[3]} />
					</div>
				</div>
				<div className='question-editor-form-title'>Labels (séparés par virgule)</div>
				<input type='text' name='labels' autoComplete='off' ref={labelsRef} placeholder='Clé, Géographie' defaultValue={props.question?.labels && props.question.labels.join(', ')} />
				<button className='validate-question' onClick={(props.mode === 'create' ? add : edit)}>{props.mode === 'create' ? 'Ajouter' : 'Éditer'}</button>
			</div>
		</DialogBox>
	);
}
export default QuestionEditor;

interface QuestionEditorProps {
	/**
	 * Makes an API call to add a question to the database.
	 */
	add: (q: IQuestion) => void;
	/**
	 * Closes the editor.
	 */
	close: () => void;
	/**
	 * Makes an API call to edit the question.
	 */
	edit: (q: IQuestion) => void;
	/**
	 * The mode of the editor. Can be:
	 *  - `create`: To add a question to the database.
	 *  - `edit`: To edit an existing question.
	 *  - `hidden`: When the editor is not being used.
	 */
	mode: 'create' | 'edit' | 'hidden';
	/**
	 * The current data of the question to edit. Defined in `edit` mode only.
	 */
	question?: IQuestion;
}