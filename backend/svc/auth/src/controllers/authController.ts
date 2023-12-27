import { CookieOptions, Request, Response } from 'express';
import { findAndUpdateUser, getGoogleOAuthTokens, getGoogleUserProfile } from '../utils/userService';
import { createSession } from '../utils/sessionService';
import { generateToken } from '../utils/tokenUtils';

const accessTokenCookieOptions: CookieOptions = {
	maxAge: 900000, // 15 minutes
	httpOnly: true,
	domain: "localhost",
	path: "/",
	sameSite: "lax",
	secure: process.env.NODE_ENV === "production",
};

const refreshTokenCookieOptions: CookieOptions = {
	...accessTokenCookieOptions,
	maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
};

const origin = process.env.FRONTEND_ORIGIN_URL;

export async function getGoogleOAuthHandler(req: Request, res: Response) {
	// Get the code from the request query string
	const code = req.query.code as string;

	// If no code was provided, return an error
	if (!code) {
		return res.status(400).send({ error: 'No code provided' });
	}

	try {
		// Get the ID and Access tokens based on the code
		const { id_token, access_token } = await getGoogleOAuthTokens({ code });
		console.log(id_token, access_token);

		// Get the user's profile based on the id token
		const googleUser = await getGoogleUserProfile({ id_token, access_token });

		// Check if the user email is verified
		if (!googleUser.verified_email) {
			return res.status(400).send('Google account email not verified');
		}

		// Upsert the user in the database
		const user = await findAndUpdateUser({
			email: googleUser.email,
		}, {
			googleId: googleUser.id,
			email: googleUser.email,
			name: googleUser.name,
			picture: googleUser.picture,
		}, {
			upsert: true,
			new: true,
		});

		// Ensure that the user was created
		if (!user) {
			// Handle the case where the user is not found or there's an issue with upserting the user
			return res.status(500).send('An error occured while upserting user.');
		}

		// Create a session for the user
		const session = await createSession(user._id, req.get("user-agent") || "");

		// Generate access and refresh tokens for the user
		const accessToken = generateToken(
			{ ...user.toJSON(), session: session._id }, // Include the session ID in the access token payload
			{ expiresIn: process.env.ACCESS_TOKEN_LIFE_SPAN }
		);

		const refreshToken = generateToken(
			{ ...user.toJSON(), session: session._id }, // Include the session ID in the refresh token payload
			{ expiresIn: process.env.REFRESH_TOKEN_LIFE_SPAN }
		);

		// Set the access and refresh tokens as cookies
		res.cookie("accessToken", accessToken, accessTokenCookieOptions);

		res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

		// Return the access and refresh tokens
		res.status(200).json({
			status: 'success',
			message: 'Authentication successful. Redirect to dashboard.',
			redirectTo: `${origin}/dashboard`,
		});
	} catch (error: any) {
		console.error(error);
		return res.status(500).send({ error: error.message });
	}
}