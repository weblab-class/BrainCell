const mongoose = require("mongoose");

// TODO: fix grades
const gradesSchema = new mongoose.Schema({
  courseId: String,
  assignmentId: String,
  grade: Number,
})

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
<<<<<<< HEAD
  description: String,
  course: [String],
  grades: [gradesSchema],
=======
  course: [String],
>>>>>>> 7870bc6853f3302cea01b1ba23082f9a8516a350
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
