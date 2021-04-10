const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const CustomErrorMessages = require('../exceptionHandler/CustomErrorMessages');
const { encrypt } = require('../utils/util.functions');

let Schema = mongoose.Schema;

let User = new Schema({
    email: {
        type: String,
        required: [true, CustomErrorMessages.FIELD_MAY_NOT_BE_EMPTY],
        unique: true
    },
    password: {
        type: String,
        required: [true, CustomErrorMessages.FIELD_MAY_NOT_BE_EMPTY]
    },
    name: {
        type: String,
        required: [true, CustomErrorMessages.FIELD_MAY_NOT_BE_EMPTY]
    },
    lastName: {
        type: String,
        required: [true, CustomErrorMessages.FIELD_MAY_NOT_BE_EMPTY]
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    metrics: [{ type: Schema.Types.ObjectId, ref: 'metric' }]
}, 
{ 
    collection: 'user' 
});

User.plugin(uniqueValidator, {
    message: CustomErrorMessages.MUST_BE_UNIQUE
});

/**
 * Previous a user creatin the password will be encripted
 */
User.pre('save', async function () {
    const user = this;
    const hash = await encrypt(user.password);
    user.password = hash;
});

module.exports = mongoose.model('user', User);
