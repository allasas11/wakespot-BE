const express = require('express');
const { getSessions, getSessionById, createSession, updateSession, removeSession } = require('../controllers/sessionController');

const router = express.Router();

router.get('/', getSessions);
router.get('/:id', getSessionById);
router.post('/', createSession);
router.put('/:id', updateSession);
router.delete('/:id', removeSession);

module.exports = router;