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
const session = require("./models/session");
const slides = require("./models/slides")

// import pdf to picture functionality

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
  user.findById(req.query.id).then((userFound) => {course.find({_id : userFound.course}).then((classes) => res.send(classes))}).catch((err)=>res.send(err))
})

router.post("/courseCode", (req, res) =>{
  const newStudent = new Object ({
        userId : req.user._id,
        name : req.user.name,
        email : req.user.email,
      })
  course.findOneAndUpdate({courseCode: req.body.courseCode},
    {$push: {students: newStudent}}).then((courseObj)=> {
      user.findOneAndUpdate({_id: req.user._id},
        {$push: {course: courseObj._id}}).then()
    }).then(() => res.send({}))
})
  
router.post("/course", (req,res) =>{
  async function checkCode() {
    let alphaNumericCode = Math.random().toString(36).slice(-6);
    let isUnique = false;

    while (isUnique){
      temp = course.find({courseCode : alphaNumericCode})
      if (temp!==alphaNumericCode) {
        isUnique = true
      } else {
        alphaNumericCode = Math.random().toString(36).slice(-6);
      }
    }
    return alphaNumericCode
  }

  checkCode().then((newCode) => {
    const newStaff = new Object ({
      userId : req.user._id,
      name : req.user.name,
      email : req.user.email,
    })
    const newCourse = new course ({
      courseNumber : req.body.courseNumber,
      name : req.body.courseName,
      staff : [newStaff],
      students : [],
      color: req.body.color,
      courseCode: newCode
    });

    newCourse.save().then((savedCourse) => {
      user.findByIdAndUpdate(req.user,
        {$push: {course: savedCourse._id}}).then(() => res.send({}))})
  })


})

router.post("/deleteCourse", (req,res) => {
  course.findByIdAndDelete(req.body.courseId).then((courseObj) => {
    students=courseObj.students
    staff=courseObj.staff

    students.forEach((student) => {
      user.findByIdAndUpdate(student.userId,
        {$pull: {course: courseObj._id}}  
      ).then((tempStudent) => tempStudent.save())
    })

    staff.forEach((staffMem) => {
      user.findByIdAndUpdate(staffMem.userId,
        {$pull: {course: courseObj._id}}  
      ).then((tempStaff) => tempStaff.save())
    })
  }).then(() => res.send({}))
})

router.get("/user", (req, res) =>{
  user.find({_id : req.query.id}).then((userFound) => res.send(userFound))
});

router.post("/students", (req,res) => {
  user.findOneAndUpdate({email: req.body.email},
    {$push: {course: req.body.courseId}}).then((userFound) => {
    const newStudent = new Object ({
      userId : userFound._id,
      name : userFound.name,
      email : userFound.email,
    })

    course.findByIdAndUpdate(req.body.courseId,
      {$push : {students : newStudent}}).then(() => {res.send({})})
})
})

router.post("/deleteStudents", (req,res) => {
  course.findById(req.body.courseId).then((courseObj) => {
    courseObj.students = courseObj.students.filter((person) => person.email !== req.body.email)
    courseObj.save()
  }).then(() => {
    user.findOneAndUpdate({email: req.body.email},
      {$pull: {course: req.body.courseId}}).then(()=> res.send({}))
  })
})

router.post("/staff", (req,res) => {
  user.findOneAndUpdate({email: req.body.email},
    {$push: {course: req.body.courseId}}).then((userFound) => {
    const newStaff = new Object ({
      userId : userFound._id,
      name : userFound.name,
      email : userFound.email,
    })

    course.findByIdAndUpdate(req.body.courseId,
      {$push : {staff : newStaff}}).then(() => {res.send({})})
  })

})

router.post("/deleteStaff", (req,res) => {
  course.findById(req.body.courseId).then((courseObj) => {
    courseObj.staff = courseObj.staff.filter((person) => person.email !== req.body.email)
    courseObj.save()
  }).then(() => {
    user.findOneAndUpdate({email: req.body.email},
      {$pull: {course: req.body.courseId}}).then(()=> res.send({}))
  })
})

router.post("/schedule", (req, res) => {
  course.findById(req.body.courseId).then((courseFound) =>{
    courseFound.schedule = req.body.schedule
    courseFound.save()
  }).then(()=>{res.send({})})
})

router.post("/assignment", (req,res) =>{
  temp = new Object (
    {name : req.body.name,
    dueDate : req.body.dueDate,}
  )

  course.findByIdAndUpdate(req.body.id,
    {$push: {assignments : temp}}
  ).then((classy) => res.send({}))
})

router.post("/deleteAssignment", async (req,res) =>{
  let courseObj = await course.findOne({_id: req.body.courseId});
  let updatedAssignments = [];
  for (let i = 0; i < courseObj.assignments.length; i++) {
    if (courseObj.assignments[i]._id.toString() != req.body.assignmentId) {
      updatedAssignments.push(courseObj.assignments[i]);
    }
  }

    await course.findOneAndUpdate({_id: req.body.courseId}, {assignments: updatedAssignments});
    res.send({});
})

router.get("/allGrades", (req,res) => {

  course.findById(req.query.courseId).then((courseObj) => {
    resultAssignments = courseObj.assignments
    resultGrades = []

    resultAssignments.forEach((assigned) => {
      temp = assigned.grades.filter((isUser) => isUser.userId === req.query.userId)
      temp.forEach((assignment) => {
        resultGrades.push(assignment.grade)
      })
    })

    return (resultGrades)
  }).then((graded) => res.send(graded)).catch()
})

router.post("/grades", (req, res) => {
  course.findById(req.body.courseId).then((courseObj) => {
    assignment = courseObj.assignments.filter((toFind) => toFind._id.toString() == req.body.assignmentId)
    gradesPost = req.body.grades.filter((Grade) => Grade.grade != '')

    gradesPost.forEach((toPost) =>{
      assignment[0].grades = assignment[0].grades.filter((Grade) => Grade.userId != toPost.userId)
      assignment[0].grades = assignment[0].grades.concat(toPost)
    })

    courseObj.save()
  }).then(() => res.send({}))
})

// message API methods ----------------------------------------------------------------------------|

router.get("/sessions", (req,res) => {
  session.findOne({courseId: req.query.courseId}).then((sessionsFound) => res.send(sessionsFound))
})

router.post("/newSession", (req,res) => {
  newSession = new session({
    courseId: req.body.courseId,
    messages: [],
  })
  newSession.save().then(()=> res.send()).catch();
})

router.post("/endSession", (req,res) => {
  session.find({courseId: req.body.courseId}).then((sessionEnd) => {
    sessionEnd.forEach((toDel) => {
      slides.find({_id: toDel.slides}).then((sl)=>{
        sl[0].remove();
      })
      toDel.remove()
    })
  }).then(()=>res.send())
})

router.get("/questions", (req,res) =>{
  session.findOne({courseId: req.query.courseId}).then((liveSession)=>{
    if (liveSession != null){
      temp = liveSession.messages.filter((current) => current.answerTo == null)
      return temp
    }
  }).then((toSend)=>res.send(toSend)).catch((err) => console.log(err))
})

router.post("/question", (req,res) => {
  const newMessage = new Object(
    {content: req.body.content,
    answerTo: null,}
  )
  session.findOneAndUpdate({courseId: req.body.courseId}, 
    {$push: {messages: newMessage}}).then((finQuestion) => {
      res.send(finQuestion)
    })
})

router.get("/answers", (req,res) =>{
  session.findOne({courseId: req.query.courseId}).then((liveSession)=>{
    if (liveSession != null) {temp = liveSession.messages.filter((current)=> current.answerTo == req.query.answerTo)
    return temp}
  }).then((toSend)=>res.send(toSend))
})

router.post("/answer", auth.ensureLoggedIn, (req,res) => {
  const newMessage = new Object(
    {content: req.body.content,
    answerTo: req.body.answerTo,}
  )
  session.findOneAndUpdate({courseId: req.body.courseId},
    {$push: {messages: newMessage}}).then((finAnswer) => {
      res.send(finAnswer)})
})

// File Handaling
router.post("/slides", async (req, res) =>{
  const file = new slides({file: req.files.toUpload});
  file.save().then((slideFile)=>{
    session.findOneAndUpdate({courseId: req.body.courseId},
      {slides: slideFile._id}).then(()=>{res.send()})

  })
})

router.get("/slides", (req,res) =>{
  session.findOne({courseId: req.query.courseId}).then((sessionSlides) =>{
    if (sessionSlides.slides != null) {
      slides.findById(sessionSlides.slides).then((slidesFound)=>res.send(slidesFound.file))
    } else {
      res.send()
    }
  })
})

router.post("/slideNum", (req,res)=>{
  session.findOneAndUpdate({courseId: req.body.courseId},
    {page: req.body.page}).then(()=>res.send())
})

router.get("/slideNum", (req,res)=>{
  session.findOne({courseId: req.query.courseId}).then((activeSession)=>{
    if (activeSession.slides != null) {
      res.send(activeSession.page)
    } else {
      res.send()
    }
  })
})
// Ignore
router.post("/test", (req,res)=> {
  const file = req.files.toUpload;
  session.findOneAndUpdate({courseId: "61ef89e690f472a8acdd0191"},
      {slides: file}).then(()=>{res.send()})

})

router.get("/test", (req,res) =>{
  session.findOne({courseId: "61ef89e690f472a8acdd0191"}).then((sessionSlides) =>{
    res.send(sessionSlides.slides)
  })
})

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
