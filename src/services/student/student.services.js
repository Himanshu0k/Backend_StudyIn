// models/studentModel.js

class StudentService {
    constructor() {
        this.students = []; // In-memory storage
    }

    addStudent(student) {
        this.students.push(student);
    }

    getAllStudents() {
        return this.students;
    }

    getStudentById(id) {
        return this.students.find(student => student.id === id);
    }

    removeStudentById(id) {
        const index = this.students.findIndex(student => student.id === id);
        if (index !== -1) {
            return this.students.splice(index, 1)[0];
        }
        return null;
    }

    updateStudentById(id, updatedData) {
        const index = this.students.findIndex(student => student.id === id);
        if (index !== -1) {
            Object.assign(this.students[index], updatedData);
            return this.students[index];
        }
        return null;
    }

    // TODO : move this function to helper
    studentExists(id) {
        return this.students.some(student => student.id === id);
    }
}

module.exports = new StudentService(); // Export an instance of the model
