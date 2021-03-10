require('dotenv').config()
const mongoose = require('mongoose')

const { DB_USERNAME, DB_PASSWORD, DB_DATABASE_NAME } = process.env

const url = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.gxwld.mongodb.net/${DB_DATABASE_NAME}?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {

        console.log('DB connected success.')
    })
    .catch(() => {

        console.log('DB connect failed')
    })

module.exports = mongoose
