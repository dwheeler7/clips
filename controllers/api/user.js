const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const checkToken = (req, res) => {
    console.log('req.user', req.user)
    res.json(req.exp)
  }

const dataController = {
    async create(req, res, next) {
        try {
            const user = await User.create(req.body)
            const token = createJWT(user)
            res.locals.data.user = user
            res.locals.data.token = token
            next()
        } catch(err) {
            res.status(400).json(err)
        }
    },
    async login(req, res, next) {
        try {
            const user = User.findOne({ email: req.body.email })
            if (!user) throw new Error('cannot find user by email')
            const match = await bcrypt.compare(req.body.password, user.password)
            if (!match) throw new Error('passwords do not match')
            res.locals.data.user = user
            res.locals.data.token = createJWT(user)
            next()
        } catch(err) {
            res.status(400).json(err)
        }
    }   
}

const apiController = {
    auth(req, res) {
        res.json(res.locals.data.token)
    }
}

module.exports = {
    checkToken,
    dataController,
    apiController
}

function createJWT (user) {
    return jwt.sign(
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    )
}