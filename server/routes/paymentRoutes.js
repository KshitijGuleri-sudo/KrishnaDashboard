/**
 * Payment Routes
 */

const express = require('express');
const router = express.Router();
const { createPayment, updatePayment, getMonthlyPayments } = require('../controllers/paymentController');
const { authenticate, isAdmin } = require('../middleware/auth');

router.post('/', authenticate, isAdmin, createPayment);
router.put('/:id', authenticate, isAdmin, updatePayment);
router.get('/monthly', authenticate, isAdmin, getMonthlyPayments);

module.exports = router;
