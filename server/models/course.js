const mongoose = require("mongoose");

const assignemntSchema = new mongoose.Schema({
    name : String,
    instructions : String,
    dueDate : Date,
});

const staffSchema = new mongoose.Schema({
    staffId : String,
    name : String,
    email : String,
})

const daySchema = new mongoose.Schema({
    day : String,
    hours : String,
})

//defines a class schema
const courseSchema = new mongoose.Schema({
    courseNumber : String,
    courseCode : String,
    name : String,
    staff : [staffSchema],
    students : [String],
    assignments : [assignemntSchema],
    schedule : [daySchema],
    color : String,
});

module.exports = mongoose.model("course", courseSchema);