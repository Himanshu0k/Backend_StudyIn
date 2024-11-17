import Teacher from './teacher.model.js'; // Import the Mongoose Teacher model

class TeacherService {
    // Add a new teacher
    async addTeacher(teacherData) {
        try {
            const teacher = new Teacher(teacherData);
            return await teacher.save(); // Save teacher to the database
        } catch (error) {
            throw new Error('Error adding teacher: ' + error.message);
        }
    }

    // Get all teachers
    async getAllTeachers() {
        try {
            return await Teacher.find(); // Fetch all teachers
        } catch (error) {
            throw new Error('Error fetching teachers: ' + error.message);
        }
    }

    // Get a teacher by ID
    async getTeacherById(id) {
        try {
            return await Teacher.findOne({id: id}); // Find teacher by ID
        } catch (error) {
            throw new Error('Error fetching teacher: ' + error.message);
        }
    }

    // Remove a teacher by ID
    async removeTeacherById(id) {
        try {
            return await Teacher.findOneAndDelete({id: id}); // Delete teacher by ID
        } catch (error) {
            throw new Error('Error removing teacher: ' + error.message);
        }
    }

    // Update a teacher by ID
    async updateTeacherById(id, updatedData) {
        try {
            return await Teacher.findOneAndUpdate({id: id}, updatedData, { new: true }); // Update and return the updated teacher
        } catch (error) {
            throw new Error('Error updating teacher: ' + error.message);
        }
    }

    // Check if a teacher exists by ID
    async teacherExists(id) {
        try {
            return await Teacher.findOne({ id: id }); // Check if teacher exists in the database
        } catch (error) {
            throw new Error('Error checking teacher existence: ' + error.message);
        }
    }
}

export default new TeacherService(); // Export an instance of the service
