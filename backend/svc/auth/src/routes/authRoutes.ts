import express from 'express';

// Create a new router to handle all requests to /api/v1/auth
const router = express.Router();

// Import the controller file
import { getGoogleOAuthHandler, validateUserHandler } from '../controllers/authController';


/**
 * @route   GET /api/v1/health
 * @desc    Health check route
 * @access  Public
 * @returns {Object} { status: string, message: string }
 */
router.get('/health', (req, res) => {
    res.json({ status: 'UP', message: 'Auth service is running' });
});


/**
 * @route   GET /api/v1/auth/oauth/google
 * @desc    Redirects to Google consent screen for OAuth authentication
 * @access  Public
 * @returns {string} Google OAuth URL
 */
// router.get('/oauth/google', getGoogleOAuthURL);


/**
 * @route   GET /api/v1/auth/sessions/oauth/google
 * @desc    Authenticates user with Google OAuth and sets access and refresh tokens as cookies
 * @access  Public
 * @returns {Object} { accessToken: string}
 * @returns {Object} { refreshToken: string}
 * @returns {Object} { status: string, message: string redirectTo: string}
 */
router.get('/sessions/oauth/google', getGoogleOAuthHandler);


/**
 * @route   GET /api/v1/auth/sessions/validation
 * @desc    Validates and verifies user's access token
 * @access  Public
 * @returns {Object} { valid: boolean, expired: boolean, decoded: Object }
 */
router.get('/sessions/validation', validateUserHandler);


export { router as authRoutes };