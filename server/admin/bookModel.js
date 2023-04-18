const mongoose = require("mongoose");
const CONSTANTS = require('../shared/constants');
const bookCategory = require("./bookCategory");
const bookStatus = require("./bookStatus");
const Schema = mongoose.Schema;

// Create Schema
const BookSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    category: {
        type: String,
        unique: true,
        required: [true, CONSTANTS.CATEGORY_REQUIRED],
        enum: [...Object.values(bookCategory)],
    },
    status: {
        type: String,
        required: [true, CONSTANTS.STATUS_REQUIRED],
        enum: [...Object.values(bookStatus)]
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'user' },

},
{
    timestamps: true,
    versionKey: false 
});

module.exports = User = mongoose.model("book", BookSchema);