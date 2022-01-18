const mongoose = require("mongoose");

const gradesSchema = new mongoose.Schema({
  courseId : String,
  assignmentId : String,
  grade : Number,
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
