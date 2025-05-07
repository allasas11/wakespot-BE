const mongoose = require('mongoose');
const SPECIALTIES = require('../config/specialties')
const CERTIFICATIONS = require('../config/certifications')

const { Schema } = mongoose;

const InstructorSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
    minlength: [3, 'Name must be at least 3 characters long'],
 },
  bio: {
    type: String,
    trim: true,
    required: true,
    minlength: [10, 'Bio must be at least 10 characters'],
    maxlength: [500, 'Bio cannot exceed 500 characters'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true,
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\- .\/]*)?\.(jpe?g|png|gif)(\?\S*)?$/i.test(v);
      },
      message: props => `${props.value} is not a valid image URL`
    }
  },
  specialty: {
    type: String,
    required: true,
    enum: Object.values(SPECIALTIES),
  },
  activeLocations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true,
  }],
  yearsOfExperience: {
    type: Number,
    min: [0, 'Years of experience cannot be negative'],
    max: [50, 'Too high value for years of experience'],
    required: false,
  },
  certifications: {
    type: [String],
    required: true,
    enum: Object.values(CERTIFICATIONS),
  },
  isActive: {
    type: Boolean,
    default: true
  },
}, 
{ timestamps: true });

module.exports = mongoose.model('Instructor', InstructorSchema);