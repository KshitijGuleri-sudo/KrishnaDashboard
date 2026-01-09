/**
 * User Routes
 */

const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, deleteUser, getEditors } = require('../controllers/userController');
const { authenticate, isAdmin } = require('../middleware/auth');

router.get('/', authenticate, isAdmin, getAllUsers);
router.get('/editors', authenticate, isAdmin, getEditors);
router.post('/', authenticate, isAdmin, createUser);
router.delete('/:id', authenticate, isAdmin, deleteUser);

module.exports = router;
