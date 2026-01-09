/**
 * Models Index
 * Sets up all model associations
 */

const User = require('./User');
const Company = require('./Company');
const Project = require('./Project');
const Payment = require('./Payment');

// Define associations
Company.hasMany(Project, { foreignKey: 'company_id', as: 'projects' });
Project.belongsTo(Company, { foreignKey: 'company_id', as: 'company' });

User.hasMany(Project, { foreignKey: 'editor_id', as: 'assigned_projects' });
Project.belongsTo(User, { foreignKey: 'editor_id', as: 'editor' });

Project.hasMany(Payment, { foreignKey: 'project_id', as: 'payments' });
Payment.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });

module.exports = {
  User,
  Company,
  Project,
  Payment
};
