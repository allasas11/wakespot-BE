const express = require('express');
const { getPackages, getPackageById, createPackage, updatePackage, deletePackage } = require('../controllers/equipmentPackageController');
const authMiddleWare = require('../middlewares/authMiddleware')

const router = express.Router();

router.get('/', getPackages);
router.get('/:id', getPackageById);
router.post('/', authMiddleWare, createPackage);
router.put('/:id', authMiddleWare, updatePackage);
router.delete('/:id', authMiddleWare, deletePackage);

module.exports = router;