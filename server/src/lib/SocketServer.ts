import { Server, ServerOptions } from 'socket.io';
import { Server as HTTPServer } from 'http';
import SocketEvent from './SocketEvent';
import { readdirSync } from 'fs';
import { join } from 'path';

export default class SocketServer extends Server {
	/**
	 * Events of every connection to this server.
	 */
	events: Map<string, SocketEvent>;

	constructor(srv: HTTPServer | number, opts?: Partial<ServerOptions>) {
		super(srv, opts);
		this.events = new Map<string, SocketEvent>();
		this.loadEvents('../events');
		this.on('connection', (socket) => {
			console.log('new connection');
			this.events.forEach(e => {
				console.log(e);
				socket.on(e.name, e.executor.bind(this));
			});
		});
	}

	loadEvents(src: string): void {
		const files = readdirSync(join(__dirname, src));
		for (const file of files) {
			const event: SocketEvent = require(join(__dirname, src, file)).default;
			this.events.set(event.name, event);
		}
	}

}