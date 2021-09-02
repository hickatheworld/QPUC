import { Schema, model } from 'mongoose';

/**
 * A TLMVPSC Admin.
 */
export interface IAdmin {
	/**
	 * The hashed password of the admin.
	 */
	password: string;
	/**
	 * The username of the admin.
	 */
	username: string;
}

const AdminSchema = new Schema<IAdmin>({
	password: {
		required: true,
		type: String
	},
	username: {
		required: true,
		type: String
	}
});

export const AdminModel = model('admin', AdminSchema);