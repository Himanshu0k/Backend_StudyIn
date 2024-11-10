/* global process */
import jwt from 'jsonwebtoken';
import response from '../../libs/response.js';

const verifyToken = (req, res, next) => {
   const SECRET_KEY = process.env.SECRET_KEY;
   const authHeader = req.headers['authorization']; // This header typically contains the JWT token in the format: Bearer <token>

   // Check if the Authorization header exists and contains a token
   if (!authHeader) {
       // If there's no token, immediately return an error response
       return response.errorResponse(res, 'Access denied, authorization header missing');
   }

   // Remove the 'Bearer ' prefix from the token to get the actual JWT
   const token = authHeader.split(' ')[1]; 
//    const token = authHeader

   // Verify the token
   jwt.verify(token, SECRET_KEY, (err, decoded) => {
       // If an error occurs (e.g., invalid or expired token)
       if (err) {
           console.error("JWT Verification Error: ", err); // Debugging JWT error
           return response.errorResponse(res, 'Invalid Token'); // Return the error response immediately
       }

       // If the token is valid, attach the decoded data to the request object
       req.user = decoded;  // Now you can access the decoded token payload as req.user

       // Proceed to the next middleware or route handler
       next();
   });
}

export default verifyToken;
