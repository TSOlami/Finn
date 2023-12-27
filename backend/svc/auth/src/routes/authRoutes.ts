import express from 'express';

// Create a new router to handle all requests to /api/v1/auth
const router = express.Router();

// Import the controller file
import { getGoogleOAuthHandler } from '../controllers/authController';

// Import utils
import { getGoogleOAuthURL } from '../utils/getGoogleURL';


/**
 * @route   GET /api/v1/auth/oauth/google
 * @desc    Redirects to Google consent screen for OAuth authentication
 * @access  Public
 */
router.get('/oauth/google', getGoogleOAuthURL);


/**
 * @route   GET /api/v1/auth/sessions/oauth/google
 * @desc    Authenticates user with Google OAuth
 * @access  Public
 * @returns {string} Google OAuth URL
 */
router.get('/sessions/oauth/google', getGoogleOAuthHandler);

export { router as authRoutes };