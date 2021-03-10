const Quiz = require('../db/schemas/quiz')

class Model {

    static async fetchAll() {

        const quizes = await Quiz.find()

        return quizes
    }

    static async fetchById(id) {

        const quiz = await Quiz.findById(id)

        return quiz
    }

    constructor({ title, authorId, questions }) {

        this.title = title
        this.authorId = authorId
        this.questions = questions
    }

    async save() {

        const quiz = new Quiz({
            title: this.title,
            authorId: this.authorId,
            questions: this.questions
        })

        await quiz.save()
    }
}

module.exports = Model
