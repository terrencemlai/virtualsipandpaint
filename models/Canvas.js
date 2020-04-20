const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CanvasSchema = new Schema({
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})