import IQuestion from './Question';

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
	 * Questions loaded in the AdminPanel.
	 */
	questions: IQuestion[] | null;
}

export default AdminPanelState;