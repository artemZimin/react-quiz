const express = require('express')
const router = express.Router()
const getAllQuizes = require('../controllers/quizes/getAllQuizes')
const createQuiz = require('../controllers/quizes/createQuiz')
const getQuizById = require('../controllers/quizes/getQuizById')

router.get('/', getAllQuizes)
router.post('/', createQuiz)
router.get('/:id', getQuizById)

module.exports = router
