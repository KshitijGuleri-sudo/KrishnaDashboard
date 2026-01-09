/**
 * Project Routes
 */

const express = require('express');
const router = express.Router();
const {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getProjectStats
} = require('../controllers/projectController');
const { authenticate, isAdmin } = require('../middleware/auth');

router.get('/stats', authenticate, isAdmin, getProjectStats);
router.get('/', authenticate, getAllProjects);
router.get('/:id', authenticate, getProject);
router.post('/', authenticate, isAdmin, createProject);
router.put('/:id', authenticate, updateProject);
router.delete('/:id', authenticate, isAdmin, deleteProject);

module.exports = router;
