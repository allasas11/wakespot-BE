const mongoose = require('mongoose');
const Instructor = require('../models/instructorModel');

const getInstructors = async (req, res) => {
    try {
        const instructors = await Instructor.find()
            .populate('activeLocations', 'name address');

        res.send(instructors);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching instructors', error: err.message });
    }
};

const getInstructorById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid instructor ID' });
    }

    try {
        const instructor = await Instructor.findById(id)
            .populate('activeLocations', 'name address');

        if (!instructor) {
            return res.status(404).send({ message: 'Instructor not found' });
        }

        res.send(instructor);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching instructor', error: err.message });
    }
};

const createInstructor = async (req, res) => {
    const { name, bio, specialty, activeLocations } = req.body;

    if (!name || !bio || !specialty || !activeLocations) {
        return res.status(400).send({
            message: 'Name, bio, specialty, and activeLocations are required'
        });
    }

    try {
        const instructor = new Instructor(req.body);
        await instructor.save();

        res.send(instructor);
    } catch (err) {
        res.status(500).send({ message: 'Error creating instructor', error: err.message });
    }
};

const updateInstructor = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid instructor ID' });
    }

    try {
        const updatedInstructor = await Instructor.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedInstructor) {
            return res.status(404).send({ message: 'Instructor not found' });
        }

        const populatedInstructor = await Instructor.findById(updatedInstructor._id)
            .populate('activeLocations', 'name address');

        res.send(populatedInstructor);
    } catch (err) {
        res.status(500).send({ message: 'Error updating instructor', error: err.message });
    }
};

const removeInstructor = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid instructor ID' });
    }

    try {
        const removedInstructor = await Instructor.findByIdAndDelete(id);

        if (!removedInstructor) {
            return res.status(404).send({ message: 'Instructor not found' });
        }

        res.send({ message: 'Instructor deleted successfully' });
    } catch (err) {
        res.status(500).send({ message: 'Error deleting instructor', error: err.message });
    }
};

module.exports = {
    getInstructors,
    getInstructorById,
    createInstructor,
    updateInstructor,
    removeInstructor
};