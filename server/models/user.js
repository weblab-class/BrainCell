const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  googleid: String,
  description: String,
  course: [String],
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
