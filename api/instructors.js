const express = require('express');
const { getInstructors, getInstructorById, createInstructor, updateInstructor, removeInstructor } = require('../controllers/instructorController');
const authMiddleWare = require('../middlewares/authMiddleware')

const router = express.Router();

router.get('/', getInstructors);
router.get('/:id', getInstructorById);
router.post('/', authMiddleWare, createInstructor);
router.put('/:id', authMiddleWare, updateInstructor);
router.delete('/:id', authMiddleWare, removeInstructor);

module.exports = router;