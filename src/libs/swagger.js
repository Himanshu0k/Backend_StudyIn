export const swaggerOptions = {   
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API of StudyIn',
            version: '1.0.0',
            description: 'API documentation for the application of StudyIn',
        },
        servers: [
            {
               url: 'http://localhost:3000',
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis: [
        './src/controllers/login/login.controller.js',
        './src/controllers/students/student.controller.js',
        './src/controllers/teachers/teacher.controller.js',
        './src/controllers/attendence/attendence.controller.js'
    ],
};
