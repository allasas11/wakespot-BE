const express = require('express');
const { getBookings, getBookingById, createBooking, updateBooking, deleteBooking } = require('../controllers/bookingController');
const authMiddleWare = require('../middlewares/authMiddleware')

const router = express.Router();

router.get('/', getBookings);
router.get('/:id', getBookingById);
router.post('/', authMiddleWare, createBooking);
router.put('/:id', authMiddleWare, updateBooking);
router.delete('/:id', authMiddleWare, deleteBooking);

module.exports = router;