import axios from 'axios';
import React from 'react';
import '../../style/AdminPanel/AdminPanel.css';
import IQuestion from '../../types/IQuestion';
import Button from '../common/Button';
import QuestionEditor from './QuestionEditor';
import QuestionsList from './QuestionsList';

class AdminPanel extends React.Component<{}, AdminPanelState> {
	usernameRef: React.RefObject<HTMLInputElement>;
	passwordRef: React.RefObject<HTMLInputElement>;
	constructor(props: any) {
		super(props);
		this.state = {
			connected: false,
			credentials: null,
			conFailed: false,
			editorProps: {
				mode: 'hidden'
			},
			questions: null
		};
		this.usernameRef = React.createRef<HTMLInputElement>();
		this.passwordRef = React.createRef<HTMLInputElement>();
	}
	/**
	 * Connects to API and loads questions.
	 */
	async connect() {
		const username = this.usernameRef.current!.value;
		const password = this.passwordRef.current!.value;
		try {
			await axios.get(process.env.REACT_APP_API_URI!, {
				headers: {
					'Authorization': `${username}:${password}`
				}
			});
			// If wrong credentials are given, this will throw an Error due to 401 HTTP response.
			this.setState({
				connected: true,
				credentials: { username, password },
				conFailed: false
			});
			const questions = await axios.get(`${process.env.REACT_APP_API_URI}/questions/get`, {
				headers: {
					'Authorization': `${username}:${password}`
				}
			});
			this.setState({ questions: questions.data });
		} catch (_) {
			this.setState({ conFailed: true });
		}
	}

	async deleteCard(id: string): Promise<void> {
		if (!this.state.credentials || !this.state.questions)
			return;
		try {
			const res = await axios.delete(`${process.env.REACT_APP_API_URI}/questions/delete/${id}`, {
				headers: {
					'Authorization': `${this.state.credentials.username}:${this.state.credentials.password}`,
				}
			});
			if (res.data.success) {
				const questions = this.state.questions.filter(q => q.id !== id);
				this.setState({ questions });
			}
		} catch (_) {
			return;
		}
	}

	async openCreateEditor() {
		const editorProps = this.state.editorProps;
		editorProps.question = undefined;
		editorProps.mode = 'create';
		this.setState({ editorProps });
	}

	async openEditEditor(question: IQuestion) {
		this.setState({ editorProps: { question, mode: 'edit' } });
	}

	async addQuestion(question: IQuestion): Promise<void> {
		if (!this.state.questions)
			return;
		try {
			const res = await axios.put(`${process.env.REACT_APP_API_URI}/questions/add`, {
				...question
			}, {
				headers: {
					'Authorization': `${this.state.credentials?.username}:${this.state.credentials?.password}`
				}
			});
			const questions = this.state.questions;
			questions.push(res.data.question);
			this.setState({ editorProps: { mode: 'hidden' }, questions });
			return;
		} catch (_) {
			return;
		}
	}

	async editQuestion(question: IQuestion): Promise<void> {
		if (!this.state.questions)
			return;
		try {
			await axios.patch(`${process.env.REACT_APP_API_URI}/questions/edit/${question.id}`, {
				...question
			}, {
				headers: {
					'Authorization': `${this.state.credentials?.username}:${this.state.credentials?.password}`
				}
			});
			const questions = this.state.questions;
			const i = questions.findIndex(q => q.id === question.id);
			questions[i] = question;
			this.setState({ editorProps: { mode: 'hidden' }, questions });
		} catch (_) {
		}
	}

	closeEditor(): void {
		this.setState({ editorProps: { mode: 'hidden' } });
	}

	render() {
		if (this.state.connected) {
			return (
				<div className='admin-panel'>
					<div className='admin-panel-title'>
						TLMVPSC - Admin Panel
					</div>
					<div className='admin-panel-grid'>
						<QuestionsList
							questions={this.state.questions}
							deleteQuestion={this.deleteCard.bind(this)}
							openCreateEditor={this.openCreateEditor.bind(this)}
							openEditEditor={this.openEditEditor.bind(this)}
						></QuestionsList>
						<QuestionEditor
							{...this.state.editorProps}
							add={this.addQuestion.bind(this)}
							close={this.closeEditor.bind(this)}
							edit={this.editQuestion.bind(this)}
						/>
					</div>
				</div>
			);
		}
		else {
			return (
				<div className='admin-panel-login'>
					<img src='/assets/main-logo.png' alt='TLMVPSC' className='admin-panel-logo' />
					<div className='admin-panel-title'>Panneau Administrateur</div>
					<div className='credentials-form'>
						<div className='failed-connection' style={{ visibility: this.state.conFailed ? 'visible' : 'hidden' }}>Nom d'utilisateur ou mot de passe invalide</div>
						<input type='text' id='username' name='username' ref={this.usernameRef} placeholder={'Nom d\'utilisateur'} />
						<input type='password' id='password' name='password' ref={this.passwordRef} placeholder='Mot de passe' />
						<Button onClick={this.connect.bind(this)}>Se connecter</Button>
					</div>
				</div>
			);
		}
	}
}
export default AdminPanel;

/**
 * State of an AdminPanel component.
 */
interface AdminPanelState {
	/**
	 * Wether an attempt to connect has been done and has failed.
	 */
	conFailed: boolean;
	/**
	 * Whether the component has correct credentials for  the API.
	 */
	connected: boolean;
	/**
	 * The credentials used to request the API.
	 */
	credentials: { username: string, password: string } | null;
	/**
	 * Props of the QuestionEditor.
	 */
	editorProps: { question?: IQuestion, mode: 'create' | 'edit' | 'hidden' };
	/**
	 * Questions loaded in the AdminPanel.
	 */
	questions: IQuestion[] | null;
}