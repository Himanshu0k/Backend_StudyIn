/*

There is a login controller object which has 2 functions
1. login
2. verifyToken

Login :- login function is used to validate the users username and password to check if he/she can login.
-> pass a username
-> pass a password
-> comparing username entered by the user with the username of the .env file
-> comparing password entered by the user with the password of the .env file
-> if both of them matched , repond with a message "Login Successfull"
-> create a token if the user gets logged in

verifyToken :- this function is used to verify the token
-> split the generated token with " " and select the string in the 1st index number as it is the token along with the authorization header
-> if the header is missing , return an error
-> if the token is missing , return an error
-> if the generated token matches with the token entered by the user, return message "Verified Token"

*/

// require('dotenv').config(); // It is used to load environment variables in this file from the .env file

// used to generate and verify tokens. Usefull for stateless authentication where token is used to reperesent user's identity
const jwt = require('jsonwebtoken');  

const loginController = {
    login: (req, res) => { // login function within the loginController object

        // Load SECRET_KEY, USERNAME, and PASSWORD from .env
        const SECRET_KEY = process.env.SECRET_KEY;
        const ENV_USERNAME = process.env.LOGIN_USERNAME;
        const ENV_PASSWORD = process.env.PASSWORD;

        console.log("Secret Key during login: ", SECRET_KEY); // Debugging SECRET_KEY
        console.log("Username from .env: ", ENV_USERNAME); // Debugging USERNAME
        console.log("Password from .env: ", ENV_PASSWORD); // Debugging PASSWORD

        const { username, password } = req.body; // request username and password from thr user

        console.log("Entered Username: ", username); // Debugging user-entered username
        console.log("Entered Password: ", password); // Debugging user-entered password

        // Check if username or password is missing
        if (!username || !password) {
            return res.status(400).json({ status: 400, error: 'Username and password are required' });
        }

        // Check if the username matches the one from .env
        if (username !== ENV_USERNAME) {
            return res.status(401).json({ status: 401, error: 'Invalid username' });
        }

        // Check if the password matches the one from .env
        if (password !== ENV_PASSWORD) {
            return res.status(401).json({ status: 401, error: 'Invalid password' });
        }

        // Generate JWT token upon successful login
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        console.log("Generated Token: ", token); // Debugging generated token

        // Respond with the token
        return res.status(200).json({ status: 200, message: 'Login successful', token });
    }
    
};

module.exports = loginController;
