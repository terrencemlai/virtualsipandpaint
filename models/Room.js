const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    host: {
        type: String,
        require: true
    },
    canvas: {
        type: Schema.Types.ObjectId,
        ref: 'Canvas'
    }
    // videos: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Video'
    // }
})

module.exports = Room = mongoose.model('Room', RoomSchema);