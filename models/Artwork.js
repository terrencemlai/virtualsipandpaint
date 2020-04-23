const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtworkSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    data_url: {
        type: String,
        require: true
    }

})

module.exports = Artwork = mongoose.model('Artwork', ArtworkSchema);