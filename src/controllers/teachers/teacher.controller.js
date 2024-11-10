
import teacherModel from '../../services/teacher/teacher.services.js';
import response from '../../libs/response.js';
import authenticate from '../../libs/middleware/authorization.js'; // Import the authentication module

const teacherController = {
    /**
     * @swagger
     * /teachers:
     *   post:
     *     summary: Add a new teacher
     *     description: Adds a new teacher to the system.
     *     tags: [Teachers]
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               address:
     *                 type: string
     *               gender:
     *                 type: string
     *               subject_name:
     *                 type: string
     *     responses:
     *       200:
     *         description: Successfully added teacher
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                 teacher:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: integer
     *                     name:
     *                       type: string
     *                     address:
     *                       type: string
     *                     gender:
     *                       type: string
     *                     subject_name:
     *                       type: string
     *       400:
     *         description: Error when adding teacher
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     */
    addTeacher: (req, res) => {
        const teachers = teacherModel.getAllTeachers(); // Get all teachers
        const id = teachers.length > 0 ? Math.max(...teachers.map(t => t.id)) + 1 : 1; // Finding the max ID

        let { name, address, gender, subject_name } = req.body;

        // Check if teacher with this auto-generated ID already exists
        if (teacherModel.teacherExists(id)) {
            return response.errorResponse(res, 'Teacher with this ID already exists');
        }

        // Trim the input fields
        name = name.trim();
        address = address.trim();
        gender = gender.trim();
        subject_name = subject_name.trim();

        // Create the new teacher object
        const teacher = { id, name, address, gender, subject_name };

        // Add the teacher to the model
        teacherModel.addTeacher(teacher);

        // Respond with success
        return response.successResponse(res, 'Added teacher details successfully', teacher);
    },

    /**
     * @swagger
     * /teachers:
     *   get:
     *     summary: Fetch all teachers
     *     description: Fetches the list of all teachers in the system.
     *     tags: [Teachers]
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Successfully fetched teachers
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                   name:
     *                     type: string
     *                   address:
     *                     type: string
     *                   gender:
     *                     type: string
     *                   subject_name:
     *                     type: string
     */
    fetchAllTeachers: (req, res) => {
        const teachers = teacherModel.getAllTeachers();
        return response.successResponse(res, 'Fetched teacher details successfully', teachers);
    },

    /**
     * @swagger
     * /teachers/{id}:
     *   get:
     *     summary: Fetch a teacher by ID
     *     description: Fetches a teacher's details using the teacher ID.
     *     tags: [Teachers]
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: The ID of the teacher to fetch
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Successfully fetched teacher
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                 name:
     *                   type: string
     *                 address:
     *                   type: string
     *                 gender:
     *                   type: string
     *                 subject_name:
     *                   type: string
     *       400:
     *         description: Teacher not found
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     */
    fetchTeacherById: (req, res) => {
        const teacher = teacherModel.getTeacherById(parseInt(req.params.id));

        let task = req.body.task; // Assuming 'task' is part of the request body

        task = authenticate.teacherRead(task); // Authenticate permissions
        
        if (!teacher) {
            return response.errorResponse(res, 'Teacher not found, Invalid teacher ID');
        }
        return response.successResponse(res, 'Fetched single teacher details successfully , ' + task, teacher);
    },

    /**
     * @swagger
     * /teachers/{id}:
     *   delete:
     *     summary: Remove a teacher by ID
     *     description: Deletes a teacher using the teacher ID.
     *     tags: [Teachers]
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: The ID of the teacher to delete
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Successfully deleted teacher
     *       400:
     *         description: Teacher not found
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     */
    removeTeacherById: (req, res) => {
        const deletedTeacher = teacherModel.removeTeacherById(parseInt(req.params.id));
        if (!deletedTeacher) {
            return response.errorResponse(res, 'Teacher not found, Invalid teacher ID');
        }
        return response.successResponse(res, 'Deleted teacher details successfully', deletedTeacher);
    },

    /**
     * @swagger
     * /teachers/{id}:
     *   patch:
     *     summary: Update teacher details by ID
     *     description: Updates teacher information using the teacher ID.
     *     tags: [Teachers]
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: The ID of the teacher to update
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               address:
     *                 type: string
     *               gender:
     *                 type: string
     *               subject_name:
     *                 type: string
     *     responses:
     *       200:
     *         description: Successfully updated teacher
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                 name:
     *                   type: string
     *                 address:
     *                   type: string
     *                 gender:
     *                   type: string
     *                 subject_name:
     *                   type: string
     *       400:
     *         description: Teacher not found
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     */
    updateTeacherById: (req, res) => {
        let task = req.body.task;
        task = authenticate.teacherWrite(task); // Authenticate permissions for task
    
        // Find the teacher by ID
        const teacher = teacherModel.getTeacherById(parseInt(req.params.id));
        if (!teacher) {
            return response.errorResponse(res, 'Teacher not found, Invalid teacher ID');
        }
    
        // Update teacher fields based on the request
        Object.keys(req.body).forEach(key => {
            if (req.body[key]) {
                teacher[key] = req.body[key].trim().toLowerCase(); // Normalize input
            }
        });
    
        const updatedTeacher = teacherModel.updateTeacherById(parseInt(req.params.id), teacher);
    
        if (!updatedTeacher) {
            return response.errorResponse(res, 'Teacher not found, Invalid teacher ID');
        }
    
        // Remove 'task' from the updated teacher object before sending the response
        delete updatedTeacher.task;
    
        // Return success response with task message but exclude 'task' from the returned JSON
        response.successResponse(res, `Updated teacher with ID ${req.params.id} successfully, task: ${task}`, updatedTeacher);
    }
};

export default teacherController;
