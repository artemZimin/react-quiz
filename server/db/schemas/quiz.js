const mongoose = require('mongoose')
const { Schema } = mongoose

const quizSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 200
    },
    authorId: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        default: Date.now
    },
    questions: [
        {
            id: {
                type: Number,
                required: true
            },
            text: {
                type: String,
                required: true,
                maxlength: 200
            },
            rightAnswerId: {
                type: Number,
                required: true,
                min: 1,
                max: 4
            },
            answers: [
                {
                    text: {
                        type: String,
                        maxlength: 200,
                        required: true
                    },
                    id: {
                        type: Number,
                        required: true,
                        min: 1,
                        max: 4
                    }
                }
            ]
        }
    ]
})

module.exports = mongoose.model('Quiz', quizSchema)
