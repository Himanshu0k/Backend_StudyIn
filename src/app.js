// app.js

require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const routers = require('./routes/routes.js');

// Middleware for JSON
app.use(express.json());

// Use student routes
app.use('/', routers);

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
