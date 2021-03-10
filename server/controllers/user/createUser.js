const bcrypt = require('bcrypt')
const User = require('../../models/User')

module.exports = async (req, res) => {

    const userData = { ...req.body }

    const candidate = await User.getByEmail(userData.email)

    if (candidate) {

        res.statusCode = 403
        res.json({
            message: 'Данный email уже занят'
        })
        return
    }

    bcrypt.hash(userData.password, 10, async (err, hash) => {

        userData.password = hash

        const user = new User(userData)
        await user.save()

        const newUser = await User.getByEmail(user.email)

        res.json(newUser)
    })
}
