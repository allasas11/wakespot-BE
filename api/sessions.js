const express = require('express');
const { getSessions, getSessionById, createSession, updateSession, removeSession } = require('../controllers/sessionController');
const authMiddleWare = require('../middlewares/authMiddleware')

const router = express.Router();

router.get('/', getSessions);
router.get('/:id', getSessionById);
router.post('/', authMiddleWare, createSession);
router.put('/:id', authMiddleWare, updateSession);
router.delete('/:id', authMiddleWare, removeSession);

module.exports = router;