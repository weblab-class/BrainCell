const mongoose = require("mongoose");

// TODO: fix grades
const gradesSchema = new mongoose.Schema({
  courseId: String,
  assignmentId: String,
  assignmentName: String,
  grade: Number,
})

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  description: String,
  course: [String],
  grades: [gradesSchema],
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
