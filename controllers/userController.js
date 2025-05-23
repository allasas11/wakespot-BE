const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const process = require('process')

const User = require('../models/userModel')

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching users', error: err.message });
    }
}   

const register = async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password ) {
        res.status(400).send({ message: 'All fields are required'})
    }

    const existingUser = await User.findOne({ email })
    if(existingUser) {
        res.status(400).send({ message: 'Email already exists'})
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        await newUser.save()

        console.log('New user saved:', newUser)

        return res.status(201).send({
            message: 'User registered successfully',
            user: { username, email },
        })

    } catch (error) {
        console.error('Register error:', error)
        res.status(500).send({ message: 'Error registering user', error: error.message })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)

    if (!email || !password ) {
        res.status(400).send({ message: 'Invalid email or password'})
    }

    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).send({ message: 'Invalid email or password'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(400).send({ message: 'Invalid email or password'})
        }

        const token = jwt.sign(
            { 
                id: user._id, 
                username: user.username,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        )

        console.log(token)

        return res.status(200).send({
            message: 'User successfully logged in',
            token: token,
        })

    } catch (error) {
        res.status(500).send(error)
    } 
}

const updateUser = async (req, res) => {
    const { username } = req.body
    const { id } = req.user

    if(!username) {
        return res.status(400).send({message: 'Username is required'})
    }

    try {
        const updateUser = await User.findByIdAndUpdate(
            id,
            { username },
            { new: true }
        )

        if (!updateUser) {
            return res.status(404).send({message: 'User does not exist'})
        }

        res.send({message: 'User succesfully updated', user: { username }})
    } catch (error) {
        res.status(500).send(error)
    }
}

const getProfile = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        return res.send({
            message: 'User profile',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Error fetching profile', error: error.message });
    }
};

module.exports = {
    register,
    login,
    updateUser,
    getProfile,
    getAllUsers
}