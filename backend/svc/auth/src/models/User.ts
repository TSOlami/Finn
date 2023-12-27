import mongoose, {Document, Schema} from 'mongoose';

export interface IUser extends Document {
	googleId: string;
	email: string;
	name: string;
	picture: string;
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema: Schema = new Schema({
	googleId: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	picture: {
		type: String,
	},
	}, {
		timestamps: true,
	}
);

export const User = mongoose.model<IUser>('User', UserSchema);