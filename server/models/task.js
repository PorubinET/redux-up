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
    desc: {
        type: String,
        default: "",
        trim: true
    },
    date: {
        type: Date,
        default: new Date().setHours(24),
        trim: true
    }
});

module.exports = mongoose.model("task", taskSchema);