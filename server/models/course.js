const mongoose = require("mongoose");

const assignemntSchema = new mongoose.Schema({
    name : String,
    instructions : String,
<<<<<<< HEAD
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

=======
    dueDate : Date,
});

>>>>>>> 7870bc6853f3302cea01b1ba23082f9a8516a350
//defines a class schema
const courseSchema = new mongoose.Schema({
    courseNumber : String,
    name : String,
<<<<<<< HEAD
    staff : [staffSchema],
    students : [String],
    assignments : [assignemntSchema],
    schedule : [daySchema],
    color : String,
=======
    professor : [String],
    students : [String],
    assignments : [assignemntSchema],
>>>>>>> 7870bc6853f3302cea01b1ba23082f9a8516a350
});

module.exports = mongoose.model("course", courseSchema);