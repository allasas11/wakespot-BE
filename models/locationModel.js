const mongoose = require('mongoose');
const { Schema } = mongoose;

const LocationSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    maxlength: [100, 'Name cannot be longer than 100 characters'],
    minlength: [3, 'Name must be at least 3 characters long'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    maxlength: [200, 'Address cannot be longer than 200 characters'],
    minlength: [5, 'Address must be at least 5 characters long'],
    trim: true
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be longer than 500 characters'],
    minlength: [10, 'Description must be at least 10 characters long'],
    trim: true,
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true,
    validate: {
        validator: function (v) {
          return /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\- ./]*)?\.(jpg|jpeg|png|gif)$/i.test(v);
        },
        message: props => `${props.value} is not a valid image URL`
      }
  },
  isActive: {
    type: Boolean,
    default: true
  },
},
{ timestamps: true });

module.exports = mongoose.model('Location', LocationSchema);
