const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library for creating and verifying JWTs

// Sample user credentials (in a real application, use a database for this)
const user = {
    username: 'admin', // Hardcoded username for demo purposes
    password: 'password123', // Hardcoded password for demo purposes
};

const secretKey = 'secret_key'; // Use a strong secret key for signing tokens

// Function to handle login requests
const login = (req, res) => {
    // Destructure username and password from the request body
    const { username, password } = req.body;

    // Check if the provided credentials match the hardcoded user
    if (username === user.username && password === user.password) {
        // Generate a JWT token with the username as the payload, valid for 1 hour
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        // Respond with success status and the generated token
        return res.status(200).json({ success: true, message: 'Login successful!', token });
    } else {
        // If credentials do not match, respond with an unauthorized status
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
};

// Export the login function for use in routes
module.exports = { login };
