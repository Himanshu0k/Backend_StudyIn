import studentServices from "../student/student.services.js";
import teacherServices from "../teacher/teacher.services.js";

class AttendanceModel {
   // Check if the teacher exists
   checkTeacher(id) {
      return teacherServices.teacherExists(id);
   }

   // Get students enrolled in a specific class taught by a teacher
   getStudentsInClass(class_name) {
      return studentServices.getStudentByClassName(class_name);
  }

   updateStudentAttendance(id, attendence) {
      return studentServices.updateStudentAttendance(id, attendence);
   }
  
}

const attendanceModel = new AttendanceModel();
export default attendanceModel;
