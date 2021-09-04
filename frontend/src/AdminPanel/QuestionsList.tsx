import React from 'react';
import IQuestion from '../types/Question';
import QuestionCard from './QuestionCard';
import '../style/QuestionsList.css';

function QuestionsList(props: { questions: IQuestion[] | null, deleter: (id: string) => Promise<boolean> }): React.ReactElement {
	return (
		<div className='questions-list'>
			<div className='questions-list-title'>Questions</div>
			{(props.questions) ?
				(props.questions.length === 0) ?
					<div className='warn'>Il n'y a aucune question dans la base de données.</div>
					:
					<div className='questions'>
						{props.questions.map(
							q => <QuestionCard
								q={q}
								del={() => props.deleter(q.id)}
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