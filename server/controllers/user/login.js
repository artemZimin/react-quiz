const bcrypt = require('bcrypt')
const User = require('../../models/User')

const throwError = response => {

    response.statusCode = 404
    response.json({
        message: 'Неверное имя или пароль'
    })
}

module.exports = async (req, res) => {

    const userData = { ...req.body }

    const candidate = await User.getByEmail(userData.email)

    if (!candidate) {
        
        throwError(res)
        return
    }

    bcrypt.compare(req.body.password, candidate.password, function(err, result) {

        if (!result || err) {

            throwError(res)
            return
        }

        res.json(candidate)
    })
}
