const express = require('express');
const { getLocations, getLocationById, createLocation, updateLocation, removeLocation } = require('../controllers/locationController');

const router = express.Router();

router.get('/', getLocations);
router.get('/:id', getLocationById);
router.post('/', createLocation);
router.put('/:id', updateLocation);
router.delete('/:id', removeLocation);

module.exports = router;