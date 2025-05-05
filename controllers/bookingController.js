const mongoose = require('mongoose');
const Booking = require('../models/bookingModel');
const Session = require('../models/sessionModel');     
const EquipmentPackage = require('../models/equipmentPackageModel'); 

const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('user', 'username email')
            .populate('session', 'date time durationMinutes price status')
            .populate('equipmentPackages', 'name price itemsIncluded');

        res.send(bookings);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching bookings', error: err.message });
    }
};

const getBookingById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid booking ID' });
    }

    try {
        const booking = await Booking.findById(id)
            .populate('user', 'username email')
            .populate('session', 'date time durationMinutes price status')
            .populate('equipmentPackages', 'name price itemsIncluded');

        if (!booking) {
            return res.status(404).send({ message: 'Booking not found' });
        }

        res.send(booking);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching booking', error: err.message });
    }
};

const createBooking = async (req, res) => {
    const { session, equipmentPackages } = req.body;

    if (!session) {
        return res.status(400).send({ message: 'Session is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(session)) {
        return res.status(400).send({ message: 'Invalid session ID' });
    }

    try {
        const sessionData = await Session.findById(session);

        if (!sessionData) {
            return res.status(404).send({ message: 'Session not found' });
        }

        if (sessionData.status === 'booked') {
            return res.status(400).send({ message: 'Session is already booked' });
        }

        let totalPrice = sessionData.price;

        if (equipmentPackages && equipmentPackages.length > 0) {
            const packages = await EquipmentPackage.find({
                _id: { $in: equipmentPackages }
            });

            packages.forEach(pkg => totalPrice += pkg.price);
        }

        const newBooking = new Booking({
            ...req.body,
            totalPrice
        });

        await newBooking.save();

        await Session.findByIdAndUpdate(session, { status: 'booked' });

        const populatedBooking = await Booking.findById(newBooking._id)
            .populate('user', 'username email')
            .populate('session', 'date time durationMinutes price status')
            .populate('equipmentPackages', 'name price itemsIncluded');

        res.status(201).send(populatedBooking);
    } catch (err) {
        res.status(500).send({ message: 'Error creating booking', error: err.message });
    }
};

const updateBooking = async (req, res) => {
    const { id } = req.params;
    const { equipmentPackages } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid booking ID' });
    }

    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedBooking) {
            return res.status(404).send({ message: 'Booking not found' });
        }

        let totalPrice = updatedBooking.session ? (await Session.findById(updatedBooking.session)).price : 0;

        if (equipmentPackages && equipmentPackages.length > 0) {
            const packages = await EquipmentPackage.find({
                _id: { $in: equipmentPackages }
            });

            packages.forEach(pkg => totalPrice += pkg.price);
        }

        updatedBooking.totalPrice = totalPrice;
        await updatedBooking.save();

        const populatedBooking = await Booking.findById(updatedBooking._id)
            .populate('user', 'username email')
            .populate('session', 'date time durationMinutes price status')
            .populate('equipmentPackages', 'name price itemsIncluded');

        res.send(populatedBooking);
    } catch (err) {
        res.status(500).send({ message: 'Error updating booking', error: err.message });
    }
};

const deleteBooking = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid booking ID' });
    }

    try {
        const deletedBooking = await Booking.findByIdAndDelete(id);

        if (!deletedBooking) {
            return res.status(404).send({ message: 'Booking not found' });
        }

        if (deletedBooking.session) {
            await Session.findByIdAndUpdate(deletedBooking.session, { status: 'available' });
        }

        res.send({ message: 'Booking deleted successfully' });
    } catch (err) {
        res.status(500).send({ message: 'Error deleting booking', error: err.message });
    }
};

module.exports = {
    getBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking
};