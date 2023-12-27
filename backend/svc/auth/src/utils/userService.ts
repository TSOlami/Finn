import axios from 'axios';
import { query } from 'express';
import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import qs from 'qs';
import { IUser, User } from '../models/User';

interface GoogleOAuthTokens {
	access_token: string;
	expires_in: number;
	scope: string;
	token_type: string;
	id_token: string;
	refresh_token: string;
}
export async function getGoogleOAuthTokens({code}: {code: string}): Promise<GoogleOAuthTokens> {
	const url = 'https://oauth2.googleapis.com/token';

	const values = {
		code,
		client_id: process.env.GOOGLE_CLIENT_ID,
		client_secret: process.env.GOOGLE_CLIENT_SECRET,
		redirect_uri: process.env.GOOGLE_REDIRECT_URL,
		grant_type: 'authorization_code',
	};

	try {
		const response = await axios.post<GoogleOAuthTokens>(url, qs.stringify(values), {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});

		return response.data;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.message);
	}
}

interface GoogleUserProfile {
	id: string;
	email: string;
	verified_email: boolean;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
	locale: string;
}

export async function getGoogleUserProfile({id_token, access_token}: {id_token: string; access_token: string}): Promise<GoogleUserProfile> {
	const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`;

	try {
		const response = await axios.get<GoogleUserProfile>(url, {
			headers: {
				Authorization: `Bearer ${id_token}`,
			},
		});

		return response.data;
	} catch (error: any) {
		console.error(error);
		throw new Error(error.message);
	}
}

export async function findAndUpdateUser(
	query: FilterQuery<IUser>,
	update: UpdateQuery<IUser>,
	options: QueryOptions = {}
) {
	return User.findOneAndUpdate(query, update, options)
}