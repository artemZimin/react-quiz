const express = require('express')
const router = express.Router()
const createUser = require('../controllers/user/createUser')
const login = require('../controllers/user/login')

router.post('/', createUser)
router.post('/login', login)

module.exports = router
