// models/teacherModel.js

class TeacherService {
   constructor() {
       this.teachers = []; // In-memory storage for teachers
   }

   addTeacher(teacher) {
       this.teachers.push(teacher);
   }

   getAllTeachers() {
       return this.teachers;
   }

   getTeacherById(id) {
       return this.teachers.find(teacher => teacher.id === id);
   }

   removeTeacherById(id) {
       const index = this.teachers.findIndex(teacher => teacher.id === id);
       if (index !== -1) {
           return this.teachers.splice(index, 1)[0];
       }
       return null;
   }

   updateTeacherById(id, updatedData) {
       const index = this.teachers.findIndex(teacher => teacher.id === id);
       if (index !== -1) {
           Object.assign(this.teachers[index], updatedData);
           return this.teachers[index];
       }
       return null;
   }

   // TODO: move this function to helper
   teacherExists(id) {
       return this.teachers.some(teacher => teacher.id === id);
   }
}

export default new TeacherService(); // Export an instance of the model
