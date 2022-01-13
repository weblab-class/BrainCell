const mongoose = require("mongoose");

//defines a class schema
const courseSchema = new mongoose.Schema({
    courseNumber : Number,
    name : String,
    professor : [Number],
    students : [Number],
});

module.exports = mongoose.model("course", courseSchema);