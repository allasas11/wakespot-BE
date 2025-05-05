const express = require('express');
const { getInstructors, getInstructorById, createInstructor, updateInstructor, removeInstructor } = require('../controllers/instructorController');

const router = express.Router();

router.get('/', getInstructors);
router.get('/:id', getInstructorById);
router.post('/', createInstructor);
router.put('/:id', updateInstructor);
router.delete('/:id', removeInstructor);

module.exports = router;