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
      console.log(student)
      user.findByIdAndUpdate(student.userId,
        {$pull: {course: courseObj._id}}  
      ).then((tempStudent) => tempStudent.save())
    })

    staff.forEach((staffMem) => {
      console.log(staffMem)
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
  console.log(req.body.assignmentId)
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
    // console.log(req.query.userId)

    //TODO: get grades
    // resultAssignmnets.forEach((job) => {
    //   job.grades.forEach((assign)=>{
    //     temp = assign.filter((isGrade) => isGrade!=req.query.userId)
    //     resultGrades.push(temp)
    //   })
    //   // console.log(temp)
    // })
    // console.log(resultGrades)

    for(let i = 0; i < resultAssignments.length; i++){
      // console.log(resultAssignments[i])
      // resultGrades.push(resultAssignments[i].grades.filter((isGrade) => {
      //   isGrade.userId === req.query.userId}))
      resultGrades.push(resultAssignments[i].grades[0])
    }
    // console.log(resultGrades)

    return (resultGrades)
  }).then((graded) => res.send({graded}))
})

router.post("/grades", (req, res) => {
  course.findById(req.body.courseId).then((courseObj) => {
    assignment = courseObj.assignments.filter((toFind) => toFind._id != req.body.assignmentId)
    // courseObj.assignments = courseObj.assignments.filter((toFind) => toFind._id == req.body.assignmentId)
    // temp.grades = req.body.grades
    // console.log(temp)
    // console.log(temp.grades)
    // console.log(assignment[0].grades)
    assignment[0].grades = assignment[0].grades.concat(req.body.grades)
    // courseObj.assignments.push(...temp)
    // console.log(courseObj.assignments)
    console.log(assignment)
    courseObj.save()
  }).then(() => res.send({}))
})

// message API methods ----------------------------------------------------------------------------|

router.get("/sessions", (req,res) => {
  session.find({courseId: req.body.courseId}).then((sessionsFound) => res.send({sessionsFound}))
})

router.post("/makeSession", (req,res) => {
  newSession = new session({
    courseId: req.body.courseId,
    slides: req.body.slides,
  })

  newSession.save().then(()=>res.send({}));
})

router.post("/deleteSession", (req,res) => {
  session.findByIdAndDelete(req.body.sessionId)
})

router.post("/question", (req,res) => {
  const newMessage = new Object(
    {content: req.body.content,
    answerTo: null,}
  )
  socketManager.getIo().emit("question", newMessage);
  session.findByIdAndUpdate(req.body.sessionId, 
    {$push: {messages: newMessage}}).then(() => res.send(newMessage))
})

router.post("/answer", auth.ensureLoggedIn, (req,res) => {
  const newMessage = new message(
    {content: req.body.content,
    answerTo: req.body.answerTo,}
  )
  socketManager.getIo().emit("answer", newMessage);
  session.findByIdAndUpdate(req.body.sessionId, 
    {$push: {messages: newMessage}}).then(() => res.send(newMessage))
})

router.get("/messages", (req,res) => {
  session.findById(req.body.sessionId).then((sessionFound) => res.send(sessionFound.messages))
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
