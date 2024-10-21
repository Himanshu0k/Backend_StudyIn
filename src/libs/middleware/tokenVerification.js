// verifyToken middleware

const jwt = require('jsonwebtoken');  

const {successResponse, errorResponse} = require('../../libs/response');

const verifyToken = (req, res, next) => { // verify token function within the loginController object
   // used to verify JWT (JSON seb tokens) sent along with the API request

   const SECRET_KEY = process.env.SECRET_KEY;
   const authHeader = req.headers['authorization']; // This header typically contains the JWT token in the format: Bearer <token>.

   // Check if the Authorization header exists and contains a token
   if (!authHeader) {
    //    return res.status(403).json({ status: 403, error: 'Access denied, authorization header missing' });
       errorResponse(res, 'Access denied, authorization header missing')
   }

   // Verify the token
   jwt.verify(authHeader, SECRET_KEY, (err, user) => {
       // Error : if the token is expired 
       if (err) {
           console.error("JWT Verification Error: ", err); // Debugging JWT error
        //    return res.status(403).json({ status: 403, error: 'Invalid token', message: err.message });
            errorResponse(res, 'Invalid Token');
       }

       // Token is valid, proceed with the request
       console.log("Token verified successfully");

       next();
   });
}

module.exports = verifyToken