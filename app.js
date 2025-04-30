const express = require('express')
const process = require("process")
const cors = require('cors')
const app = express()
require('dotenv').config()
require('./db')

app.use(express.json())
app.use(cors())

const userApiRoutes = require('./api/users')


app.use('/api/users', userApiRoutes)

const PORT = process.env.PORT || 3010
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
