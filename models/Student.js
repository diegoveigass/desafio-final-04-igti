import { db } from '../models/index.js';

const studentSchema = db.mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: Number, min: 0 },
  lastModified: { type: Date, default: Date.now },
});

const Student = mongoose.model('students', studentSchema);

export default Student;
