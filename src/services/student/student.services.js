// Import the Student model
import Student from './student.model.js';

class StudentService {
    // Add a new student
    async addStudent(studentData) {
        try {
            const student = new Student(studentData);
            return await student.save(); // Save to the database
        } catch (error) {
            throw new Error('Error adding student: ' + error.message);
        }
    }

    // Get all students
    async getAllStudents() {
        try {
            return await Student.find(); // Fetch all students
        } catch (error) {
            throw new Error('Error fetching students: ' + error.message);
        }
    }

    // Get a student by ID
    async getStudentById(id) {
        try {
            return await Student.findOne({id: id}); // Find student by ID
        } catch (error) {
            throw new Error('Error fetching student: ' + error.message);
        }
    }

    // Get students by class name
    async getStudentByClassName(className) {
        try {
            return await Student.find({ course_name: className }); // Find students by class
        } catch (error) {
            throw new Error('Error fetching students by class: ' + error.message);
        }
    }

    // Remove a student by ID
    async removeStudentById(id) {
        try {
            return await Student.findOneAndDelete({id : id}); // Delete student by ID
        } catch (error) {
            throw new Error('Error removing student: ' + error.message);
        }
    }

    // Update a student by ID
    async updateStudentById(id, updatedData) {
        try {
            return await Student.findOneAndUpdate({id: id}, updatedData, { new: true }); // Update and return the new document
        } catch (error) {
            throw new Error('Error updating student: ' + error.message);
        }
    }

    // Update attendance for a student
    async updateStudentAttendance(id, attendance) {
        try {
            const student = await Student.findOneAndUpdate(
                {id: id},
                {$set: {attendence: attendance}},
                {new: true}
            );
            if (student) {
                return await student.save(); // Save changes to the database
            }
            return null;
        } catch (error) {
            throw new Error('Error updating attendance: ' + error.message);
        }
    }

    // Check if a student exists by ID
    async studentExists(id) {
        try {
            return await Student.findOne({ id: id }); // Check existence
        } catch (error) {
            throw new Error('Error checking student existence: ' + error.message);
        }
    }
}   

export default new StudentService(); // Export an instance of the service
