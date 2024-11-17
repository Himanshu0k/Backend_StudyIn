// const mongoose = require('mongoose');
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
   id: {type: Number, required: true, unique: true},
   name: { type: String, required: true },
   address: { type: String, required: true },
   gender: { type: String, required: true },
   course_name: { type: String, required: true },
   attendence: {type: String, required: true}
});

export default mongoose.model('Student', studentSchema);
