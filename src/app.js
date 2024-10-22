/* global process */
// app.js

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();
const port = process.env.PORT;
import routers from './routes/routes.js';

// Middleware for JSON
app.use(express.json());

// Use student routes
app.use('/', routers);

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
