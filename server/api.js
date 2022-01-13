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
const User = require("./models/user");
const course = require("./models/course.js");
const Assignment = require("./models/assignment.js");

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

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/course", (req, res) =>{
  course.find({$or: [{student : req.body.mitId}, {professor: req.body.mitId}]}).then((classes) => res.send(classes))
});

router.post("/course", (req,res) =>{
  const newCourse = new course ({
    courseNumber : req.body.courseNumber,
    name : req.body.courseName,
    professor : req.body.professor,
    students : req.body.students,
  });
  newCourse.save().then(res.send({}))
})

// When deleting a class, use courseNumber to find class (class must exist, will add the other case later)
router.delete("/course", (req,res) =>{
  course.deleteOne({courseNumber : req.body.courseNumber}).then(console.log("Deleted"))
})

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
