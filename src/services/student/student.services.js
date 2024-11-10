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

    getStudentByClassName(class_name) {
        return this.students.filter(student => student.course_name === class_name);
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

    updateStudentAttendance(id, attendence) {
        const student = this.getStudentById(id);
        if (student) {
            student.attendence = attendence;
            
            return student;
        }
        return null;
    }

    // TODO : move this function to helper
    studentExists(id) {
        return this.students.some(student => student.id === id);
    }
}

export default new StudentService(); // Export an instance of the model
