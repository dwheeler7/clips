const express = require('express')
const router = express.Router()
const { checkToken, dataController, apiController } = require('../../controllers/api/user')
const checkLoggedIn = require('../../config/checkLoggedIn')

// create
router.post('/', dataController.create, apiController.auth)
// login
router.post('/login', dataController.login, apiController.auth)
// check token
router.get('/check-token', checkLoggedIn, checkToken)

module.exports = router