/* global process */
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

const port = process.env.PORT;
import routers from './routes/routes.js';

import connectDB from './libs/db.js';
// connectDB();

// Middleware for JSON
app.use(express.json());

// Use student routes
app.use('/', routers);

// Start server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
async function startServer() {
    try {
        await connectDB(); // Ensure this is called before starting the server
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Failed to connect to the database:", err);
    }
}

startServer();