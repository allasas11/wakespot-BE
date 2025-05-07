const mongoose = require('mongoose');
const CATEGORIES = require('../config/categories');

const { Schema } = mongoose;

const EquipmentPackageSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
    minlength: [3, 'Name must be at least 3 characters long'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
    minlength: [10, 'Description must be at least 10 characters long'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be at least 0'],
    max: [1000, 'Price cannot exceed 1000'],
  },
  itemsIncluded: {
    type: [String],
    required: [true, 'At least one item must be included'],
    validate: {
      validator: function (array) {
        return array.length > 0;
      },
      message: 'At least one item must be included'
    }
  },
  category: {
    type: String,
    enum: Object.values(CATEGORIES),
    default: CATEGORIES.OTHER
  },
  imageUrl: {
    type: String,
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

module.exports = mongoose.model('EquipmentPackage', EquipmentPackageSchema);