/* global process */

import bcrypt from 'bcrypt';

const checkPassword = (password) => {
   const HASHED_PASSWORD = process.env.HASHED_PASSWORD;

   try {
      const isMatch = bcrypt.compare(password, HASHED_PASSWORD);
      return isMatch; // Returns true if passwords match, false otherwise
   } catch {
      throw new Error('An error occurred during password verification'); // Throw an error to be caught in the controller
   }
};

export default checkPassword;
