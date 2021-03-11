const Quiz = require('../db/schemas/quiz')

class Model {

    static async fetchAll() {

        try {

            const quizes = await Quiz.find()

            return quizes

        } catch (e) {

            throw e
        }
    }

    static async fetchById(id) {

        try {

            const quiz = await Quiz.findById(id)

            return quiz
            
        } catch (e) {

            throw e
        }
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

        try {

            await quiz.save()
            
        } catch (e) {

            throw e
        }
    }
}

module.exports = Model
