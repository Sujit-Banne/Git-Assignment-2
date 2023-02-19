const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { v4: uuidv4 } = require('uuid')

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        user: {
            type: String,
            required: true,
            default: uuidv4
        }
    }
)

module.exports = mongoose.model('Post', postSchema)
