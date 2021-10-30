
export default class SocketEvent {
	/**
	 * The name of this event.
	 */
	name: string;
	/**
	 * Callback of this event.
	 * @this SocketServer
	 */
	executor: (...any) => void;

	constructor(name, executor) {
		this.name = name;
		this.executor = executor;
	}
}