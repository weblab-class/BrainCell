const mongoose = require("mongoose");

const gradesSchema = new mongoose.Schema({
    userId: String,
    grade: String,
})

const assignmentSchema = new mongoose.Schema({
    name : String,
    dueDate : Date,
    grades : [gradesSchema],
});

const userSchema = new mongoose.Schema({
    userId : String,
    name : String,
    email : String,
})

//defines a class schema
const courseSchema = new mongoose.Schema({
    courseNumber : String,
    courseCode : String,
    name : String,
    staff : [userSchema], //CHANGE TO SCHEMA
    students : [userSchema],
    assignments : [assignmentSchema],
    schedule : [Object],
    color : String,
});

module.exports = mongoose.model("course", courseSchema);