require('dotenv').config()
require('./db/connect')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.APP_PORT || 80

app.use(bodyParser.json())

app.use(require('./middlewares/cors'))

app.use('/api/quizes', require('./routes/quizes'))
app.use('/api/user', require('./routes/user'))
app.use('/api/completed-quizes', require('./routes/completedQuizes'))

app.listen(PORT, () => {

    console.log(`Server has been started on ${PORT} port`)
})
