const mongoose = require('mongoose');
const Location = require('../models/locationModel');

const getLocations = async (req, res) => {
    try {
      const locations = await Location.find();
      res.send(locations);
    } catch (err) {
      res.status(500).send({ message: 'Error fetching locations', error: err.message });
    }
  };

const getLocationById = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid location ID' });
    }
  
    try {
      const location = await Location.findById(id);
  
      if (!location) {
        return res.status(404).send({ message: 'Location not found' });
      }
  
      res.send(location);
    } catch (err) {
      res.status(500).send({ message: 'Error fetching location', error: err.message });
    }
  };

const createLocation = async (req, res) => {
    const { name, address } = req.body;
    
    if (!name || !address) {
      return res.status(400).send({ message: 'Name, address, are required' });
    }

    try {
      const location = new Location(req.body);
      await location.save();
      res.send(location);

    } catch (err) {
      res.status(500).send({ message: 'Error creating location', error: err.message });
    }
  };

const updateLocation = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid location ID' });
    }

    const { name, address } = req.body;
    
    if (!name || !address) {
      return res.status(400).send({ message: 'Name, address, are required' });
    }
  
    try {
      const updatedLocation = await Location.findByIdAndUpdate(
        id, 
        req.body, 
        { new: true, runValidators: true }
    );
  
      if (!updatedLocation) {
        return res.status(404).send({ message: 'Location not found' });
      }
  
      res.send(updatedLocation);
    } catch (err) {
      res.status(500).send({ message: 'Error updating location', error: err.message });
    }
  };  

const removeLocation = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid location ID' });
    }
  
    try {
      const deletedLocation = await Location.findByIdAndDelete(id);
  
      if (!deletedLocation) {
        return res.status(404).send({ message: 'Location not found' });
      }
  
      res.send({ message: 'Location deleted successfully' });
    } catch (err) {
      res.status(500).send({ message: 'Error deleting location', error: err.message });
    }
  }; 

module.exports = {
  getLocations,
  getLocationById,
  createLocation,
  updateLocation,
  removeLocation
};