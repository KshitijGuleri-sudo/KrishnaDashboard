/**
 * Company Controller
 * Handles company CRUD operations
 */

const { Company } = require('../models');

// @desc    Get all companies
// @route   GET /api/companies
// @access  Private
const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll({
      order: [['company_name', 'ASC']]
    });
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create company
// @route   POST /api/companies
// @access  Private (Admin only)
const createCompany = async (req, res) => {
  try {
    const { company_name } = req.body;
    
    const existingCompany = await Company.findOne({ where: { company_name } });
    if (existingCompany) {
      return res.status(400).json({ message: 'Company already exists' });
    }
    
    const company = await Company.create({ company_name });
    
    res.status(201).json({
      message: 'Company created successfully',
      company
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAllCompanies, createCompany };
