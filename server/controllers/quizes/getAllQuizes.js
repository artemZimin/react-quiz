const Quiz = require('../../models/Quiz')

module.exports = async (req, res) => {

    try {

        const quizes = await Quiz.fetchAll()

        res.send(quizes)

    } catch (e) {

        res.status(500)
        res.end()
    }
}
