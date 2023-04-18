const mongoose = require("mongoose");
const CONSTANTS = require('../shared/constants');
const util = require('../shared/util');
const userRoles = require('./roles');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    emailId: {
        type: String,
        unique: true,
        required: [true, CONSTANTS.EMAIL_ID_IS_REQUIRED],
        validate: {
            validator: util.checkEmailId,
            message: (props) => `${props.value} is not a valid Email-Id.`,
        },
    },
    password: {
        type: String,
        required: [true, CONSTANTS.PASSWORD_IS_REQUIRED],
    },
    role: {
        type: String,
        enum: [...Object.values(userRoles)],
    },
},
{
    timestamps: true,
    versionKey: false 
});

module.exports = User = mongoose.model("user", UserSchema);