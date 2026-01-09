/**
 * Payment Controller
 * Handles payment operations
 */

const { Payment, Project } = require('../models');
const { sequelize } = require('../config/database');

// @desc    Create payment
// @route   POST /api/payments
// @access  Private (Admin only)
const createPayment = async (req, res) => {
  try {
    const { project_id, amount, status } = req.body;
    
    const payment = await Payment.create({
      project_id,
      amount,
      status,
      paid_date: status === 'paid' ? new Date() : null
    });
    
    res.status(201).json({
      message: 'Payment created successfully',
      payment
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update payment
// @route   PUT /api/payments/:id
// @access  Private (Admin only)
const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    
    const { status } = req.body;
    await payment.update({
      status,
      paid_date: status === 'paid' ? new Date() : payment.paid_date
    });
    
    // Update project payment status
    if (status === 'paid') {
      await Project.update(
        { payment_status: 'paid' },
        { where: { id: payment.project_id } }
      );
    }
    
    res.json({
      message: 'Payment updated successfully',
      payment
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get monthly payments report
// @route   GET /api/payments/monthly
// @access  Private (Admin only)
const getMonthlyPayments = async (req, res) => {
  try {
    const { year } = req.query;
    const currentYear = year || new Date().getFullYear();
    
    const monthlyData = await sequelize.query(`
      SELECT 
        MONTH(paid_date) as month,
        SUM(amount) as total_amount,
        COUNT(*) as total_payments
      FROM payments
      WHERE YEAR(paid_date) = :year AND status = 'paid'
      GROUP BY MONTH(paid_date)
      ORDER BY month
    `, {
      replacements: { year: currentYear },
      type: sequelize.QueryTypes.SELECT
    });
    
    res.json(monthlyData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createPayment, updatePayment, getMonthlyPayments };
