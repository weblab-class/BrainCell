const mongoose = require("mongoose");

//defines a class schema
const AssignemntSchema = new mongoose.Schema({
    courseNumber : Number,
    name : String,
    instructions : String,
    dueDate : Date,
});

module.exports = mongoose.model("assignment", AssignemntSchema);