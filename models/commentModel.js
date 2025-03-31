const mongoose = require('mongoose')

const commentModel = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
        required: true,
    }
},
{
    timestamp: true
}
)
module.exports = mongoose.model('comment', commentModel)