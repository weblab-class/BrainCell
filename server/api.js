/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const user = require("./models/user");
const course = require("./models/course.js");
const message = require("./models/message.js")

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// Course and User API methods ---------------------------------------------------------------------|

router.get("/course", (req, res) =>{
  course.find({_id : req.body.id}).then((classes) => res.send(classes))
});

router.post("/course", (req,res) =>{
  const newCourse = new course ({
    courseNumber : req.body.courseNumber,
    name : req.body.courseName,
    staff : req.body.staff,
    students : [],
    assignments : [],
    schedule : req.body.schedule,
    color : req.body.color,
  });
  newCourse.save().then(() => {res.send({})})
})

router.delete("/course", (req,res) =>{
  course.findById(req.body.id).then((courseObj) => {
    students = courseObj.students;
    staff = courseObj.staff;
    students.forEach((student)=>{
      user.findByIdAndUpdate(student,
        {$pull : {course : req.body.id}}
        )
    })
    staff.forEach((staffMem)=>{
      user.findByIdAndUpdate(staffMem,
        {$pull : {course : req.body.id}}
      )
    })
  })
  course.deleteOne({_id:req.body.id}).then(() => res.send({}))
})

router.get("/user", (req, res) =>{
  user.find({_id : req.body.id}).then((userFound) => res.send(userFound))
});

//assumes input is array
router.post("/students", (req,res) => {
  course.findByIdAndUpdate(req.body.courseId,
    {$push : {students : {$each: req.body.students}}}
    ).then(() => {res.send({})})
})

router.delete("/students", (req,res) => {
  course.findByIdAndUpdate(req.body.courseId,
    {$pull : {students : {$each: req.body.students}}}
    ).then(() => {res.send({})})
})

router.post("/staff", (req,res) => {
  course.findByIdAndUpdate(req.body.courseId,
    {$push : {staff : {$each: req.body.staff}}}
    ).then(() => {res.send({})})
})

router.delete("/staff", (req,res) => {
  course.findByIdAndUpdate(req.body.courseId,
    {$pull : {staff : {$each: req.body.staff}}}
    ).then(() => {res.send({})})
})

router.get("/allAssignments", (req, res) =>{
  course.findById(newreq.body.id).then((courseObj) => {
    res.send(courseObj.assignments)
  })
});

router.get("/oneAssignment", (req, res) =>{
  course.findById(req.body.courseId).then((courseObj) => {
    courseObj.assignments.id(req.body.assignmentId).then((assigned) => res.send(assigned))
  })
});

router.post("/assignment", (req,res) =>{
  temp = new Object (
    {name : req.body.name,
    instructions : req.body.instructions,
    dueDate : req.body.dueDate,}
  )
  course.findByIdAndUpdate(req.body.id,
    {$push: {assignments : temp}}
  ).then(() => res.send({}))
})

router.delete("/assignment", (req,res) =>{
  course.findById(req.body.contentId).then((courseObj) => {
    courseObj.assignments.id(req.body.assignmentId).remove()
    courseObj.save()
  }).then(() => res.send({}))
})

router.get("/allGrades", (req,res) => {
  // TODO: get grades
  user.findById(req.body.userId).then((userObj) => {
    userObj.grades.find({courseId : req.body.courseId}).then((gradeArray) => res.send(gradeArray))
  })
})

router.get("/oneGrade", (req,res) => {
  // TODO: get one grade
  user.findById(req.body.userId).then((userObj) => {
    res.send(userObj.grades.id("61e5f0c2f5078b07d817b780"))
  })
})

router.post("/grades", (req, res) => {
  temp = req.body.content
  async function addGrades(t){
    t.forEach((student) => {
      console.log(student)
      user.findByIdAndUpdate(student.studentId,
        {$push : {grades: new Object(
          {courseId : student.courseId,
          assignmentId : student.assignmentId,
          grade : student.grade})}}
      ).then()
    })
  }
  addGrades(temp).then(() => res.send({}))
})

// message API methods ----------------------------------------------------------------------------|

router.post("/question", (req,res) => {
  const newMessage = new message(
    {content: req.body.content,}
  )
  newMessage.save().then((newMess) => res.send(newMess))
  socketManager.getIo().emit("question", newMessage);
})

router.post("/answer", auth.ensureLoggedIn, (req,res) => {
  const newMessage = new message(
    {content: req.body.content,
    answerTo: req.body.answerTo,}
  )
  newMessage.save();

  socketManager.getIo().emit("answer", newMessage);
})

router.get("/messages", (req,res) => {
  message.find().then((messagesFound) => res.send(messagesFound));
})

// Ignore
router.get("/test", (req,res) =>{
  res.send({})
})

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
