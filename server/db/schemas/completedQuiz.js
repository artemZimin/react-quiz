const mongoose = require('mongoose')
const { Schema } = mongoose

const completedQuizSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    quizId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        default: Date.now
    },
    questions: [{
        id: {
            type: Number,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        rightAnswerId: {
            type: Number,
            required: true,
            min: 1,
            max: 4
        },
        selectedAnswerId: {
            type: Number,
            required: true,
            min: 1,
            max: 4
        },
        answers: [{
            text: {
                type: String,
                required: true
            },
            id: {
                type: Number,
                required: true,
                min: 1,
                max: 4
            }
        }]
    }]
})

module.exports = mongoose.model('completedQuiz', completedQuizSchema)
