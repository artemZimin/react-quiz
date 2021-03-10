const User = require('../db/schemas/user')

class Model {

    static async getByEmail(email) {

        return await User.findOne({ email })
    }

    constructor({ email, password, name }) {

        this.email = email
        this.password = password
        this.name = name
    }

    async save() {

        const TokenGenerator = require('uuid-token-generator')
        const tokgen = new TokenGenerator(256, TokenGenerator.BASE62)

        const authToken = tokgen.generate()
        this.authToken = authToken

        const user = new User({
            email: this.email,
            password: this.password,
            name: this.name,
            authToken
        })

        await user.save()
    }
}

module.exports = Model
