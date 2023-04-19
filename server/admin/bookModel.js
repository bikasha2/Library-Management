const mongoose = require("mongoose");
const CONSTANTS = require('../shared/constants');
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
    },
    status: {
        type: String,
        required: [true, CONSTANTS.STATUS_REQUIRED],
        enum: [...Object.values(bookStatus)],
        default: bookStatus.AVAILABLE,
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'user' },

},
{
    timestamps: true,
    versionKey: false 
});

module.exports = Book = mongoose.model("book", BookSchema);