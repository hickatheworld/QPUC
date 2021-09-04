import axios from 'axios';
import React from 'react';
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
					<div id='title'>
						TLMVPSC - Admin Panel
					</div>
					<QuestionsList questions={this.state.questions}></QuestionsList>
				</div>
			);
		}
		else {
			return (
				<div className='credentials-form'>
					{this.state.conFailed && <div className='failed-connection'>Nom d'utilisateur ou mot de passe invalide</div>}
					<input type='text' id='username' name='username' ref={this.usernameRef} />
					<input type='password' id='password' name='password' ref={this.passwordRef} />
					<button id='submit' onClick={this.connect.bind(this)}>Se connecter</button>
				</div>
			);
		}
	}
}
export default AdminPanel;