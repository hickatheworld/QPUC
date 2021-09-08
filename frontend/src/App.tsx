import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminPanel from './components/AdminPanel/AdminPanel';
function App() {
	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route path='/admin'>
						<AdminPanel />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
