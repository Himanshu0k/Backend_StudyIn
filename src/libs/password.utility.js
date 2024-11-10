/* global process */
import bcrypt from 'bcrypt';

export const checkPassword = async (password) => {
   const HASHED_PASSWORD = process.env.HASHED_PASSWORD;
   try {
      const isMatch = await bcrypt.compare(password, HASHED_PASSWORD);
      return isMatch; // Returns true if passwords match, false otherwise
   } catch {
      throw new Error('An error occurred during password verification'); // Throw an error to be caught in the controller
   }
};
