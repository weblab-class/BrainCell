const mongoose = require("mongoose");

const slideSchema = new mongoose.Schema({
    file: Object,
})
// compile model from schema
module.exports = mongoose.model("slides", slideSchema);
