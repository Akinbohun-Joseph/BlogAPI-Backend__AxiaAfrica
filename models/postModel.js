//import { MongoAPIError } from 'mongodb'

const mongoose = require('mongoose')

const postModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
},
    {
        timestamps: true

    }
)
module.exports = mongoose.model('post', postModel)