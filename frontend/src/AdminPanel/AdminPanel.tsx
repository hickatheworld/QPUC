import axios from 'axios';
import React from 'react';
import '../style/AdminPanel.css';
import AdminPanelState from '../types/AdminPanelState';
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
			console.log({ username, password });
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

	render() {
		if (this.state.connected) {
			return (
				<div>
					<div className='admin-panel-title'>
						TLMVPSC - Admin Panel
					</div>
					<QuestionsList questions={this.state.questions}></QuestionsList>
				</div>
			);
		}
		else {
			return (
				<div className='admin-panel'>
					<img src='/assets/main-logo.png' alt='TLMVPSC' className='admin-panel-logo' />
					<div className='admin-panel-title'>Panneau Administrateur</div>
					<div className='credentials-form'>
						<div className='failed-connection' style={{ visibility: this.state.conFailed ? 'visible' : 'hidden' }}>Nom d'utilisateur ou mot de passe invalide</div>
						<input type='text' id='username' name='username' ref={this.usernameRef} placeholder={'Nom d\'utilisateur'} />
						<input type='password' id='password' name='password' ref={this.passwordRef} placeholder='Mot de passe' />
						<button id='submit' onClick={this.connect.bind(this)}>Se connecter</button>
					</div>
				</div>
			);
		}
	}
}
export default AdminPanel;