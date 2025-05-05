const mongoose = require('mongoose');
const Session = require('../models/sessionModel');

const getSessions = async (req, res) => {
    try {
        const sessions = await Session.find()
            .populate('location', 'name address')
            .populate('instructor', 'name bio')
            .populate('createdBy', 'username email');

        res.send(sessions);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching sessions', error: err.message });
    }
};

const getSessionById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid session ID' });
    }

    try {
        const session = await Session.findById(id)
            .populate('location', 'name address')
            .populate('instructor', 'name bio')
            .populate('createdBy', 'username email');

        if (!session) {
            return res.status(404).send({ message: 'Session not found' });
        }

        res.send(session);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching session', error: err.message });
    }
};

const createSession = async (req, res) => {
    const { location, date, time, durationMinutes, price } = req.body;

    if (!location || !date || !time || !durationMinutes || !price) {
        return res.status(400).send({
            message: 'All fields are required: location, date, time, durationMinutes, price'
        });
    }

    if (!mongoose.Types.ObjectId.isValid(location)) {
        return res.status(400).send({ message: 'Invalid location ID' });
    }

    try {
        const newSession = new Session(req.body);
        await newSession.save();

        const populatedSession = await Session.findById(newSession._id)
            .populate('location', 'name address')
            .populate('instructor', 'name bio')
            .populate('createdBy', 'username email');

        res.send(populatedSession);
    } catch (err) {
        res.status(500).send({ message: 'Error creating session', error: err.message });
    }
};

const updateSession = async (req, res) => {
    const { id } = req.params;
    const { location, instructor } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid session ID' });
    }

    if (location && !mongoose.Types.ObjectId.isValid(location)) {
        return res.status(400).send({ message: 'Invalid location ID' });
    }

    if (instructor && !mongoose.Types.ObjectId.isValid(instructor)) {
        return res.status(400).send({ message: 'Invalid instructor ID' });
    }

    try {
        const updatedSession = await Session.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedSession) {
            return res.status(404).send({ message: 'Session not found' });
        }

        const populatedSession = await Session.findById(updatedSession._id)
            .populate('location', 'name address')
            .populate('instructor', 'name bio')
            .populate('createdBy', 'username email');

        res.send(populatedSession);
    } catch (err) {
        res.status(500).send({ message: 'Error updating session', error: err.message });
    }
};

const removeSession = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid session ID' });
    }

    try {
        const removedSession = await Session.findByIdAndDelete(id);

        if (!removedSession) {
            return res.status(404).send({ message: 'Session not found' });
        }

        res.send({ message: 'Session deleted successfully' });
    } catch (err) {
        res.status(500).send({ message: 'Error deleting session', error: err.message });
    }
};

module.exports = {
    getSessions,
    getSessionById,
    createSession,
    updateSession,
    removeSession
};