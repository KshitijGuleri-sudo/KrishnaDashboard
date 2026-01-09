/**
 * Project Controller
 * Handles project CRUD operations
 */

const { Project, Company, User } = require('../models');
const { Op } = require('sequelize');

// @desc    Get all projects (filtered by role)
// @route   GET /api/projects
// @access  Private
const getAllProjects = async (req, res) => {
  try {
    const { role, id } = req.user;
    const { month, company, editor, status, payment } = req.query;
    
    let whereClause = {};
    
    // Editors only see their assigned projects
    if (role === 'editor') {
      whereClause.editor_id = id;
    }
    
    // Apply filters
    if (status) whereClause.status = status;
    if (payment) whereClause.payment_status = payment;
    if (editor) whereClause.editor_id = editor;
    if (company) whereClause.company_id = company;
    if (month) {
      const [year, monthNum] = month.split('-');
      whereClause.shoot_date = {
        [Op.between]: [
          new Date(year, monthNum - 1, 1),
          new Date(year, monthNum, 0, 23, 59, 59)
        ]
      };
    }
    
    const projects = await Project.findAll({
      where: whereClause,
      include: [
        { model: Company, as: 'company', attributes: ['id', 'company_name'] },
        { model: User, as: 'editor', attributes: ['id', 'name', 'email'] }
      ],
      order: [['created_at', 'DESC']]
    });
    
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private
const getProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [
        { model: Company, as: 'company' },
        { model: User, as: 'editor', attributes: ['id', 'name', 'email'] }
      ]
    });
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (Admin only)
const createProject = async (req, res) => {
  try {
    const {
      company_id,
      client_name,
      project_type,
      editor_id,
      shoot_date,
      delivery_date,
      amount,
      notes
    } = req.body;
    
    const project = await Project.create({
      company_id,
      client_name,
      project_type,
      editor_id,
      shoot_date,
      delivery_date,
      amount,
      notes,
      status: 'pending',
      payment_status: 'pending'
    });
    
    const fullProject = await Project.findByPk(project.id, {
      include: [
        { model: Company, as: 'company' },
        { model: User, as: 'editor', attributes: ['id', 'name', 'email'] }
      ]
    });
    
    res.status(201).json({
      message: 'Project created successfully',
      project: fullProject
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    // Editors can only update status and uploaded_files
    if (req.user.role === 'editor') {
      const { status, uploaded_files } = req.body;
      await project.update({ status, uploaded_files });
    } else {
      // Admin can update everything
      await project.update(req.body);
    }
    
    const updatedProject = await Project.findByPk(project.id, {
      include: [
        { model: Company, as: 'company' },
        { model: User, as: 'editor', attributes: ['id', 'name', 'email'] }
      ]
    });
    
    res.json({
      message: 'Project updated successfully',
      project: updatedProject
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin only)
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    
    await project.destroy();
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get project statistics
// @route   GET /api/projects/stats
// @access  Private (Admin only)
const getProjectStats = async (req, res) => {
  try {
    const total = await Project.count();
    const pending = await Project.count({ where: { status: 'pending' } });
    const inProgress = await Project.count({ where: { status: 'in_progress' } });
    const completed = await Project.count({ where: { status: 'completed' } });
    const paymentsPending = await Project.count({ where: { payment_status: 'pending' } });
    
    const revenue = await Project.sum('amount', {
      where: { payment_status: 'paid' }
    });
    
    res.json({
      total,
      pending,
      inProgress,
      completed,
      paymentsPending,
      revenue: revenue || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getProjectStats
};
