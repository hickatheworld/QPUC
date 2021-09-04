import React, { useState } from 'react';
import IQuestion from '../types/Question';
import '../style/QuestionCard.css';

function QuestionCard(props: { q: IQuestion, del: () => Promise<boolean> }): React.ReactElement {
	const [loading, setLoading] = useState(false);
	const del = async () => {
		setLoading(true);
		props.del();
	}
	return (
		<div className='question-card'>
			<div className='question-card-conten'>
				<div className='question-statement'>{props.q.statement}</div>
				<div className='question-answers'>
					{props.q.answers.map(a => <div className='question-answer'>{a}</div>)}
				</div>
				<div className='question-labels'>
					{props.q.labels && props.q.labels.map(l => <div className='question-label'>{l}</div>)}
				</div>
			</div>
			<div className='question-card-actions'>
				<div className='question-card-edit'>
					<span className="material-icons">
						edit
					</span>
				</div>
				<div className='question-card-delete' onClick={props.del}>
					<span className="material-icons">
						delete
					</span>
				</div>
			</div>
		</div>
	);
}

export default QuestionCard;