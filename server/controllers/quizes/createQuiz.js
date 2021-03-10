const Quiz = require('../../models/Quiz')

module.exports = async (req, res) => {

    const data = req.body

    const quiz = new Quiz(data)

    await quiz.save()

    res.json(quiz)
}
