const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    done: {
        type: Boolean,
        default: false,
    },
    descript: {
        type: String,
        default : ''
    }
});

module.exports = mongoose.model("task", taskSchema);