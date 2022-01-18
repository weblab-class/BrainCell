const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
<<<<<<< HEAD
  course: [String],
=======
  description: String,
  course: [String],
  grades: [gradesSchema],
>>>>>>> parent of 62b4cce (Merge branch 'backend-setup' of https://github.com/weblab-class/xydelta04-maxzetina into backend-setup)
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
