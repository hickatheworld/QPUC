import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

function App() {
	const [socket, setSocket] = useState<Socket>();
	console.log('hey');
	useEffect(() => {
		const s = io('http://localhost:3030');
		console.log(s);
		setSocket(s);
		s.on('rick-client', () => alert('Never gonna let you down.'));
	}, [setSocket]);
	const sendRick = () => {
		if (socket)
			socket.emit('rick-server');
	}
	return (
		<div className='App'>
			Never gonna give you up, never gonna let you down.
			<button onClick={sendRick}>Rick</button>
		</div>
	);
}

export default App;
