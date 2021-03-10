const Quiz = require('../../models/Quiz')

module.exports = async (req, res) => {

    const quizes = await Quiz.fetchAll()

    res.send(quizes)
}
