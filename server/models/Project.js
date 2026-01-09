/**
 * Project Model
 * Defines the projects table schema
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  company_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'companies',
      key: 'id'
    }
  },
  client_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  project_type: {
    type: DataTypes.ENUM('wedding', 'pre-shoot', 'post-shoot', 'song', 'reel', 'album'),
    allowNull: false
  },
  editor_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  shoot_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  delivery_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
    defaultValue: 'pending'
  },
  payment_status: {
    type: DataTypes.ENUM('paid', 'pending'),
    defaultValue: 'pending'
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  uploaded_files: {
    type: DataTypes.JSON,
    defaultValue: []
  }
}, {
  tableName: 'projects',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Project;
