const CompletedQuizes = require('../../models/CompletedQuiz')

module.exports = async (req, res) => {

    try {

        const completedQuizes = await CompletedQuizes.fetchByUserId(req.params.id)

        res.json(completedQuizes)
    } catch (e) {

        res.status(500)
        res.send(e.message)
    }
}
