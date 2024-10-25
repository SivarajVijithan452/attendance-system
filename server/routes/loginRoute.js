const express = require('express');
const { login } = require('../controllers/loginController'); // Import the login controller
const router = express.Router();

// Define the login route for POST requests
router.post('/api/login', login); // Only the login controller should be here

module.exports = router;
