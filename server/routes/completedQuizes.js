const express = require('express')
const router = express.Router()
const getAllCompletedQuizes = require('../controllers/completedQuizes/getAllCompletedQuizes')
const createCompletedQuiz = require('../controllers/completedQuizes/createCompletedQuiz')

router.get('/:id', getAllCompletedQuizes)
router.post('/', createCompletedQuiz)

module.exports = router
