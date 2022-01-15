const mongoose = require("mongoose");

const assignemntSchema = new mongoose.Schema({
    name : String,
    instructions : String,
    dueDate : Date,
});

//defines a class schema
const courseSchema = new mongoose.Schema({
    courseNumber : String,
    name : String,
    professor : [String],
    students : [String],
    assignments : [assignemntSchema],
});

module.exports = mongoose.model("course", courseSchema);