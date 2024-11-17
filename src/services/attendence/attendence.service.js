import studentServices from "../student/student.services.js";
import teacherServices from "../teacher/teacher.services.js";

class AttendanceModel {
   // Check if the teacher exists
   async checkTeacher(id) {
      try {
         return await teacherServices.teacherExists(id); // Check existence in DB
      } catch (error) {
         throw new Error("Error checking teacher existence: " + error.message);
      }
   }

   // Get students enrolled in a specific class
   async getStudentsInClass(className) {
      try {
         return await studentServices.getStudentByClassName(className); // Fetch students by class name
      } catch (error) {
         throw new Error("Error fetching students in class: " + error.message);
      }
   }

   // Update student attendance
   async updateStudentAttendance(id, attendance) {
      try {
         return await studentServices.updateStudentAttendance(id, attendance); // Update attendance in DB
      } catch (error) {
         throw new Error("Error updating student attendance: " + error.message);
      }
   }
}

const attendanceModel = new AttendanceModel();
export default attendanceModel;
