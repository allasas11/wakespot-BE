const mongoose = require('mongoose');
const EquipmentPackage = require('../models/equipmentPackageModel');

const getPackages = async (req, res) => {
    try {
        const packages = await EquipmentPackage.find();
        res.send(packages);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching equipment packages', error: err.message });
    }
};

const getPackageById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid equipment package ID' });
    }

    try {
        const package = await EquipmentPackage.findById(id);

        if (!package) {
            return res.status(404).send({ message: 'Equipment package not found' });
        }

        res.send(package);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching package', error: err.message });
    }
};

const createPackage = async (req, res) => {
    const { name, price, itemsIncluded } = req.body;

    if (!name || !price || !itemsIncluded) {
        return res.status(400).send({
            message: 'Name, price, and itemsIncluded are required'
        });
    }

    try {
        const newPackage = new EquipmentPackage(req.body);
        await newPackage.save();

        res.send(newPackage);
    } catch (err) {
        res.status(500).send({ message: 'Error creating equipment package', error: err.message });
    }
};

const updatePackage = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid equipment package ID' });
    }

    try {
        const updatedPackage = await EquipmentPackage.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedPackage) {
            return res.status(404).send({ message: 'Equipment package not found' });
        }

        res.send(updatedPackage);
    } catch (err) {
        res.status(500).send({ message: 'Error updating package', error: err.message });
    }
};

const deletePackage = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: 'Invalid equipment package ID' });
    }

    try {
        const deletedPackage = await EquipmentPackage.findByIdAndDelete(id);

        if (!deletedPackage) {
            return res.status(404).send({ message: 'Equipment package not found' });
        }

        res.send({ message: 'Equipment package deleted successfully' });
    } catch (err) {
        res.status(500).send({ message: 'Error deleting package', error: err.message });
    }
};

module.exports = {
    getPackages,
    getPackageById,
    createPackage,
    updatePackage,
    deletePackage
};