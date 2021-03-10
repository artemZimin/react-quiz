const CompletedQuizes = require('../../models/CompletedQuiz')
const Quiz = require('../../models/Quiz')

module.exports = async (req, res) => {

    try {
        
        const completedQuiz = new CompletedQuizes(req.body)
        await completedQuiz.save()

        res.end()
        
    } catch (e) {

        res.status(500)
        res.send(e.message)
    }
}