const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingSchema = new Schema({
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: [true, 'Session is required']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  equipmentPackages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EquipmentPackage'
  }],
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  status: {
    type: String,
    enum: {
      values: ['confirmed', 'cancelled', 'completed'],
      message: '{VALUE} is not a valid status'
    },
    default: 'confirmed'
  },
  paymentStatus: {
    type: String,
    enum: {
      values: ['pending', 'paid', 'refunded'],
      message: '{VALUE} is not a valid payment status'
    },
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  bookingDate: {
    type: Date,
    default: Date.now
  },
}, 
{ timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);