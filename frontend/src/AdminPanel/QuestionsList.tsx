import React from 'react';
import IQuestion from '../types/Question';
function QuestionsList(props: { questions: IQuestion[] | null }): React.ReactElement {
	return (
		<div className='questions-list'>
			{(props.questions) ?
				(props.questions.length === 0) ?
					<div className='warn'>Il n'y a aucune question dans la base de données.</div>
					:
					<div className='questions'>/ TO FILL /</div>
				:
				<div className='warn'>Connexion à la base de données échouée.</div>
			}
		</div>
	)
}

export default QuestionsList;