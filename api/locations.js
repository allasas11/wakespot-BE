const express = require('express');
const { getLocations, getLocationById, createLocation, updateLocation, removeLocation } = require('../controllers/locationController');
const authMiddleWare = require('../middlewares/authMiddleware')

const router = express.Router();

router.get('/', getLocations);
router.get('/:id', getLocationById);
router.post('/', authMiddleWare, createLocation);
router.put('/:id', authMiddleWare, updateLocation);
router.delete('/:id', authMiddleWare, removeLocation);

module.exports = router;