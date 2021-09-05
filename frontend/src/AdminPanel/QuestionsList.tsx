import React from 'react';
import IQuestion from '../types/Question';
import QuestionCard from './QuestionCard';
import '../style/QuestionsList.css';

function QuestionsList(props: { questions: IQuestion[] | null, deleteQuestion: (id: string) => Promise<void>, openCreateEditor: () => void, openEditEditor: (question: IQuestion) => void }): React.ReactElement {
	return (
		<div className='questions-list'>
			<div className='questions-list-title'>Questions</div>
			<div className='add-question' onClick={props.openCreateEditor}>
				<span className="material-icons">
					add
				</span>
			</div>
			{(props.questions) ?
				(props.questions.length === 0) ?
					<div className='warn'>Il n'y a aucune question dans la base de données.</div>
					:
					<div className='questions'>
						{props.questions.map(
							q => <QuestionCard
								key={q.id}
								question={q}
								del={() => props.deleteQuestion(q.id!)}
								edit={() => props.openEditEditor(q)}
							/>
						)}
					</div>
				:
				<div className='warn'>Connexion à la base de données échouée.</div>
			}
		</div>
	);
}

export default QuestionsList;