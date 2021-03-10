const Quiz = require('../../models/Quiz')

module.exports = async (req, res) => {
    
    try {

        const quiz = await Quiz.fetchById(req.params.id)

        res.json(quiz)

    } catch (e) {

        res.status(500)
        res.end()
        return
    }
}
