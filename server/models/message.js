const mongoose = require("mongoose");

//define a message schema for the database
const MessageSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    content: String,
    answerTo: String,
});

// compile model from schema
module.exports = mongoose.model("message", MessageSchema);
