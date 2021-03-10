const CompletedQuiz = require('../db/schemas/completedQuiz')

class Model {

    static async fetchAll() {

        const quizes = await CompletedQuiz.find()

        return quizes
    }

    static async fetchByUserId(userId) {

        const quizes = await CompletedQuiz.find({ userId })

        return quizes
    }

    // static async fetchAllByUserId(userId) {

    //     const quizes = await CompletedQuiz.find({ userId })

    //     return quizes
    // }

    static async fetchById(id) {

        const quiz = await CompletedQuiz.findById(id)

        return quiz
    }

    constructor({ quizId, userId, questions, title }) {

        this.quizId = quizId
        this.userId = userId
        this.questions = questions
        this.title = title
    }

    async save() {

        await CompletedQuiz.findOneAndDelete({
            quizId: this.quizId,
            userId: this.userId
        })

        const completedQuiz = new CompletedQuiz({
            quizId: this.quizId,
            userId: this.userId,
            questions: this.questions,
            title: this.title
        })

        await completedQuiz.save()
    }
}

module.exports = Model
