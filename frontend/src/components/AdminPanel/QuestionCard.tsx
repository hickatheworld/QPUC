import React from 'react';
import '../../style/QuestionCard.css';
import IQuestion from '../../types/Question';

function QuestionCard(props: { question: IQuestion, del: () => Promise<void>, edit: () => void }): React.ReactElement {
	return (
		<div className='question-card'>
			<div className='question-card-conten'>
				<div className='question-statement'>{props.question.statement}</div>
				<div className='question-answers'>
					{props.question.answers.map(a => <div className='question-answer' key={a}>{a}</div>)}
				</div>
				<div className='question-labels'>
					{props.question.labels && props.question.labels.map(l => <div className='question-label' key={l}>{l}</div>)}
				</div>
			</div>
			<div className='question-card-actions'>
				<div className='question-card-edit' onClick={props.edit}>
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