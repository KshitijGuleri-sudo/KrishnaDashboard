-- ================================================
-- SIMPLE DATABASE SETUP - RUN THIS IN SQLyog
-- Copy each section and run separately
-- ================================================

-- SECTION 1: Create Database (Run this first)
CREATE DATABASE IF NOT EXISTS editing_company_db;

-- SECTION 2: Select Database (Run this second)
USE editing_company_db;

-- SECTION 3: Create Users Table (Run this third)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'editor', 'client') DEFAULT 'editor',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- SECTION 4: Create Companies Table
CREATE TABLE companies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SECTION 5: Create Projects Table
CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_id INT NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  project_type ENUM('wedding', 'pre-shoot', 'post-shoot', 'song', 'reel', 'album') NOT NULL,
  editor_id INT,
  shoot_date DATE NOT NULL,
  delivery_date DATE NOT NULL,
  status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
  payment_status ENUM('paid', 'pending') DEFAULT 'pending',
  amount DECIMAL(10, 2) DEFAULT 0.00,
  notes TEXT,
  uploaded_files JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES companies(id),
  FOREIGN KEY (editor_id) REFERENCES users(id)
);

-- SECTION 6: Create Payments Table
CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status ENUM('paid', 'pending') DEFAULT 'pending',
  paid_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- SECTION 7: Verify Tables Created
SHOW TABLES;

-- You should see 4 tables:
-- companies
-- payments  
-- projects
-- users
