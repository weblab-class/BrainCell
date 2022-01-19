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
const assignment = require("./models/assignment.js");

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
  user.findById(req.query.id).then((userFound) => {course.find({_id : userFound.course}).then((classes) => res.send(classes))})})

router.post("/course", (req,res) =>{
  const newCourse = new course ({
    courseNumber : req.query.courseNumber,
    name : req.query.courseName,
    professor : req.query.professor,
    students : [],
  });
  newCourse.save().then(() => {res.send({})})
})

router.delete("/course", (req,res) =>{
  course.findById(req.query.id).then((courseObj) => {
    students = courseObj.students;
    staff = courseObj.staff;
    students.forEach((student)=>{
      user.findByIdAndUpdate(student,
        {$pull : {course : req.query.id}}
        )
    })
    staff.forEach((staffMem)=>{
      user.findByIdAndUpdate(staffMem,
        {$pull : {course : req.query.id}}
      )
    })
  })
  course.deleteOne({_id:req.query.id}).then(() => res.send({}))
})

router.get("/user", (req, res) =>{
  user.find({_id : req.query.id}).then((userFound) => res.send(userFound))
});

//assumes input is array
// TODO: fix cross-check on students/staff
router.post("/students", (req,res) => {

  temp = req.query.students
  temp.forEach((student) => user.findByIdAndUpdate((student),
  {$push: {course : req.query.id}}
  ))

  course.findByIdAndUpdate(req.query.courseId,
    {$push : {students : {$each: req.query.students}}}
    ).then(() => {res.send({})})
})

router.delete("/students", (req,res) => {
  temp = req.query.students
  temp.forEach((student) => user.findByIdAndUpdate((student),
  {$pull: {course : req.query.id}}
  ))

  course.findByIdAndUpdate(req.query.courseId,
    {$pull : {students : {$each: req.query.students}}}
    ).then(() => {res.send({})})
})

router.post("/staff", (req,res) => {
  temp = req.query.staff
  temp.forEach((staffMem) => user.findByIdAndUpdate((staffMem),
  {$push: {course : req.query.id}}
  ))

  course.findByIdAndUpdate(req.query.courseId,
    {$push : {staff : {$each: req.query.staff}}}
    ).then(() => {res.send({})})
})

router.delete("/staff", (req,res) => {
  temp = req.query.staff
  temp.forEach((staffMem) => user.findByIdAndUpdate((staffMem),
  {$pull: {course : req.query.id}}
  ))

  course.findByIdAndUpdate(req.query.courseId,
    {$pull : {staff : {$each: req.query.staff}}}
    ).then(() => {res.send({})})
})

router.get("/allAssignments", (req, res) =>{
  course.findById(newreq.query.id).then((courseObj) => {
    res.send(courseObj.assignments)
  })
});

router.get("/oneAssignment", (req, res) =>{
  course.findById(req.query.courseId).then((courseObj) => {
    courseObj.assignments.id(req.query.assignmentId).then((assigned) => res.send(assigned))
  })
});

router.post("/assignment", (req,res) =>{
  temp = new Object (
    {name : req.query.name,
    instructions : req.query.instructions,
    dueDate : req.query.dueDate,}
  )
  course.findByIdAndUpdate(req.query.id,
    {$push: {assignments : temp}}
  ).then(() => res.send({}))
})

router.delete("/assignment", (req,res) =>{
  course.findById(req.query.contentId).then((courseObj) => {
    courseObj.assignments.id(req.query.assignmentId).remove()
    courseObj.save()
  }).then(() => res.send({}))
})

router.get("/allGrades", (req,res) => {
  // TODO: get grades
  user.findById(req.query.userId).then((userObj) => {
    userObj.grades.find({courseId : req.query.courseId}).then((gradeArray) => res.send(gradeArray))
  })
})

router.get("/oneGrade", (req,res) => {
  // TODO: get one grade
  user.findById(req.query.userId).then((userObj) => {
    res.send(userObj.grades.id(req.query.gradeId))
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
    answerTo: req.query.answerTo,}
  )
  newMessage.save();

  socketManager.getIo().emit("answer", newMessage);
})

router.get("/messages", (req,res) => {
  message.find().then((messagesFound) => res.send(messagesFound));
})

// Ignore
router.get("/test", (req,res) =>{
  query = ["61e71802efa660767857267a", "61e717c94aed7563e0d20922"]
  course.find({_id : query}).then((classes) => res.send(classes))
})

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
