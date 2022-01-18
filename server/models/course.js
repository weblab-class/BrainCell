const mongoose = require("mongoose");

const assignemntSchema = new mongoose.Schema({
    name : String,
    instructions : String,
<<<<<<< HEAD
    dueDate : Date,
});

=======
    dueDate : String,
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

>>>>>>> parent of 62b4cce (Merge branch 'backend-setup' of https://github.com/weblab-class/xydelta04-maxzetina into backend-setup)
//defines a class schema
const courseSchema = new mongoose.Schema({
    courseNumber : String,
    name : String,
<<<<<<< HEAD
    professor : [String],
    students : [String],
    assignments : [assignemntSchema],
=======
    staff : [staffSchema],
    students : [String],
    assignments : [assignemntSchema],
    schedule : [daySchema],
    color : String,
>>>>>>> parent of 62b4cce (Merge branch 'backend-setup' of https://github.com/weblab-class/xydelta04-maxzetina into backend-setup)
});

module.exports = mongoose.model("course", courseSchema);