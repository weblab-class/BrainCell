const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    timestamp: {type: Date, default: Date.now},
    content: String,
    answerTo : {type: String, default: ""},
});

module.exports = mongoose.model("message", messageSchema)