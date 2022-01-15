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
  course.find({_id : req.body.id}).then((classes) => res.send(classes))
});

router.post("/course", (req,res) =>{
  const newCourse = new course ({
    courseNumber : req.body.courseNumber,
    name : req.body.courseName,
    professor : req.body.professor,
    students : [],
  });
  newCourse.save().then(() => {res.send({})})
})

router.delete("/course", (req,res) =>{
  course.findById(req.body.id).then((courseObj) => {
    students = courseObj.students;
    students.forEach((student)=>{
      user.updateOne(
        {_id :student},
        {$pull : {_id : req.body.id}}
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
  course.updateOne(
    {courseNumber : req.body.courseNumber},
    {$push : {students : {$each: req.body.students}}}
    ).then(() => {res.send({})})
})

router.delete("/students", (req,res) => {
  course.updateOne(
    {courseNumber :req.body.courseNumber},
    {$pull : {students : {$each: req.body.students}}}
    ).then(() => {res.send({})})
})

// add to course schema

router.get("/assignment", (req, res) =>{
  //TODO: get assignment from course
  res.send({})
});

router.post("/assignment", (req,res) =>{
  //TODO: post assignment to course
  res.send({})
})

router.delete("/assignment", (req,res) =>{
  // TODO: delete assignment
  res.send({})
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
