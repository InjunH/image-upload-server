const mongoose = require('mongoose');

const imageScheme = new mongoose.Schema(
    {
        key: { type: String , required: true },
        originalFileName: { type: String, required: true}
    },
    {
        timestamps: true,
    }
) 

module.exports = mongoose.model("image", imageScheme);