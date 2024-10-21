//  send success response
// send error response

const successResponse = (res, message, data = {}) => {
   const statusCode = 200; // Default status code for success
   return res.status(statusCode).json({
       success: true,
       message: message,
       data: data
   });
};

const errorResponse = (res, message) => {
   const statusCode = 400;
   return res.status(statusCode).json({
       success: false,
       message: message
   });
};

module.exports = { successResponse, errorResponse };
