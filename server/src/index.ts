import { createServer } from 'http';
import { Socket } from 'socket.io';
import SocketServer from './lib/SocketServer';

const server = createServer();
const io = new SocketServer(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST']
	}
});
io.listen(3030);