import { Request, Response } from 'express';
import { findAndUpdateUser, getGoogleOAuthTokens, getGoogleUserProfile } from '../utils/userService';
import { createSession } from '../utils/sessionService';
import { generateToken, verifyToken } from '../utils/tokenUtils';

// Get the frontend origin URL from the environment variables
const origin = process.env.FRONTEND_ORIGIN_URL;

export async function getGoogleOAuthHandler(req: Request, res: Response) {
	// Get the code from the request json body
	const code = req.query.code as string;

	// If no code was provided, return an error
	if (!code) {
		return res.status(400).send({ error: 'No code provided' });
	}

	// Get the user agent from the request headers
	const userAgent = req.headers['user-agent'] as string || "";

	try {
		// Get the ID and Access tokens based on the codes
		console.log("Fetching tokens...")
		const { id_token, access_token } = await getGoogleOAuthTokens({ code });
		console.log("Fetching tokens successful")

		// Get the user's profile based on the id token
		console.log("Getting user profile...")
		const googleUser = await getGoogleUserProfile({ id_token, access_token });

		// Check if the user email is verified
		if (!googleUser.verified_email) {
			return res.status(400).send('Google account email not verified');
		}

		// Upsert the user in the database
		console.log("Upserting user into database...")
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
		const session = await createSession(user._id, userAgent);

		// Generate access and refresh tokens for the user
		const accessToken = generateToken(
			{ ...user.toJSON(), session: session._id }, // Include the session ID in the access token payload
			{ expiresIn: process.env.ACCESS_TOKEN_LIFE_SPAN }
		);

		const refreshToken = generateToken(
			{ ...user.toJSON(), session: session._id }, // Include the session ID in the refresh token payload
			{ expiresIn: process.env.REFRESH_TOKEN_LIFE_SPAN }
		);

		// Return a json object with message and redirect url
		res.status(200).json({
			redirectTo: `${origin}/home`,
			tokens: {
        accessToken,
        refreshToken,
      },
		});
	} catch (error: any) {
		console.error(error);
		return res.status(500).json({
      status: 'error',
      message: error.message,
      redirectTo: null,
    })
	}
}

export async function validateUserHandler(req: Request, res: Response) {
	// Get the access token from the request headers
	const accessToken = req.headers['authorization']?.split(' ')[1];

	// If no access token was provided, return an error
	if (!accessToken) {
		return res.status(400).send({ error: 'No access token provided' });
	}

	try {
		// Verify the access token
		const { valid, expired, decoded } = verifyToken(accessToken);

		// If the access token is invalid, return an error
		if (!valid) {
			return res.status(401).send({ error: 'Invalid access token' });
		}

		// If the access token is expired, return an error
		if (expired) {
			return res.status(401).send({ error: 'Access token expired' });
		}

		// Return the decoded access token
		res.status(200).send({ decoded });
	} catch (error: any) {
		console.error(error);
		return res.status(500).send({ error: error.message });
	}
}
