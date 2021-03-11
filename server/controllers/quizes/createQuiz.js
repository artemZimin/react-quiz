const Quiz = require('../../models/Quiz')

module.exports = async (req, res) => {

    const data = req.body

    const quiz = new Quiz(data)

    try {

        await quiz.save()

        res.json(quiz)

    } catch (e) {

        res.status(500)
        res.end()
    }
}
