const mongoose = require("mongoose");

//define a message schema for the database
const MessageSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    content: String,
    answerTo: "mixed",
});

const sessionSchema = new mongoose.Schema({
    slides: String,
    courseId: String,
    messages: [MessageSchema],
    page: String,
})
// compile model from schema
module.exports = mongoose.model("session", sessionSchema);
