/* global process */
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

// Function to generate a hash and update the .env file with username and password
const generateHash = (username, password) => {
    let envFilePath = path.resolve(process.cwd(), '.env'); // Path to .env file

    const saltRounds = parseInt(process.env.SALTROUNDS, 10);
    
    // Hash the password
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) throw err;
        
        console.log('Hashed password:', hash);

        // Read the existing .env file
        let envContent = fs.readFileSync(envFilePath, 'utf-8');

        // Update existing USERNAME and PASSWORD values
        envContent = envContent.replace(/USERNAME=.*/, `USERNAME=${username}`).replace(/PASSWORD=.*/, `PASSWORD=${hash}`);

        // Write the updated content back to the .env file
        fs.writeFileSync(envFilePath, envContent);
        console.log('USERNAME and PASSWORD updated in .env file.');
    });
};

export default generateHash;

