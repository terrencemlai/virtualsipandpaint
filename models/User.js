const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    // canvas: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Canvas'
    // },
    // room: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Room'
    // }
})

module.exports = User = mongoose.model('User', UserSchema);