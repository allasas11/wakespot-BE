const express = require('express')
const { register, login, updateUser } = require('../controllers/userController')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/dashboard/profile')
router.put('/update', updateUser)

module.exports = router


