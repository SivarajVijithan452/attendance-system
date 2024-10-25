const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const loginRoute = require('./routes/loginRoute');

const app = express();
const PORT = 5000; // Define the port for the server to listen on

// Middleware configuration for Cross-Origin Resource Sharing (CORS)
// This allows requests from the specified origin (frontend app) and defines allowed methods and headers
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL to allow access
    methods: ['GET', 'POST'], // Allowed HTTP methods
    allowedHeaders: [
        "Content-Type", // Allow Content-Type header
        "Authorization", // Allow Authorization header for token-based auth
        "Cache-Control", // Allow Cache-Control header
        "Expires", // Allow Expires header
        "Pragma" // Allow Pragma header
    ],
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));

// Middleware to parse JSON bodies from incoming requests
app.use(bodyParser.json());
app.use(express.json()); // Alternative method to parse JSON bodies

// Register the login route to handle user authentication requests
app.use(loginRoute);

// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Log the server URL to the console
});
