import { createServer } from 'http';
import { Socket, Server } from 'socket.io';

const server = createServer();
const io = new Server(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST']
	}
});

io.on('connection', (socket: Socket) => {
	console.log('Connection.');
	socket.on('rick-server', () => {
		console.log('Never gonna give you up.');
		socket.emit('rick-client');
	});
});

io.listen(3030);