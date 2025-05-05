const jwt = require("jsonwebtoken")
const process = require("process")
const authMiddleWare = (req, res, next) => {

    const token = req.header('Authorization')?.replace('Bearer ', '')
    console.log(token)

    if(!token) {
        return res.status(401).send({ message: 'Access denied, no token provided'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        
        next()
    } catch (error) {
        res.status(400).send(error)
    }

}

module.exports = authMiddleWare