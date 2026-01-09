/**
 * Company Routes
 */

const express = require('express');
const router = express.Router();
const { getAllCompanies, createCompany } = require('../controllers/companyController');
const { authenticate, isAdmin } = require('../middleware/auth');

router.get('/', authenticate, getAllCompanies);
router.post('/', authenticate, isAdmin, createCompany);

module.exports = router;
