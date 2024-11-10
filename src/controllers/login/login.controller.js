/* global process */
import jwt from 'jsonwebtoken';
import response from '../../libs/response.js';
import { checkPassword } from '../../libs/password.utility.js';

const loginController = {
    /**
     * @swagger
     * /login:
     *   post:
     *     summary: User login
     *     description: Authenticates a user with a username and password, returning a JWT token if successful.
     *     tags: [Authentication]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *                 description: The username for login.
     *                 example: "user123"
     *               password:
     *                 type: string
     *                 description: The password for login.
     *                 example: "password123"
     *     responses:
     *       200:
     *         description: Login successful
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Login successful"
     *                 token:
     *                   type: string
     *                   description: JWT token for authenticated requests
     *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxMjMiLCJpYXQiOjE2MDk0MzgyOTUsImV4cCI6MTYwOTQ0MTg5NX0.XYZ"
     *       400:
     *         description: Invalid username or password
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Invalid Username"  # Or "Invalid Password"
     *       500:
     *         description: Internal server error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "An error occurred during login"
     */
    login: async (req, res) => {
        const SECRET_KEY = process.env.SECRET_KEY;
        const ENV_USERNAME = process.env.LOGIN_USERNAME; // This should be fetched from .env

        let { username, password } = req.body;

        if (username !== ENV_USERNAME) {
            return response.errorResponse(res, 'Invalid Username');
        }

        try {
            const isPasswordValid = await checkPassword(password);
            
            if (isPasswordValid) {
                const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
                return response.successResponse(res, 'Login successful', token);
            } else {
                return response.errorResponse(res, 'Invalid Password');
            }
        } catch (error) {
            console.error('Error comparing passwords:', error);
            return response.errorResponse(res, 'An error occurred during login');
        }
    }
};

export default loginController;
