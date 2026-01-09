/**
 * Automated Database Setup Script
 * Creates database and all tables programmatically
 * No need for manual SQL in SQLyog
 */

require('dotenv').config();
const mysql = require('mysql2/promise');

const setupDatabase = async () => {
  let connection;
  
  try {
    console.log('🔧 Starting automated database setup...\n');
    
    // Step 1: Connect to MySQL (without database)
    console.log('📡 Connecting to MySQL server...');
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root'
    });
    console.log('✅ Connected to MySQL server\n');
    
    // Step 2: Create Database
    console.log('🗄️  Creating database...');
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'editing_company_db'}`);
    console.log('✅ Database created\n');
    
    // Step 3: Use Database
    await connection.query(`USE ${process.env.DB_NAME || 'editing_company_db'}`);
    console.log('✅ Using database\n');
    
    // Step 4: Create Users Table
    console.log('👥 Creating users table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'editor', 'client') DEFAULT 'editor',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_role (role)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Users table created\n');
    
    // Step 5: Create Companies Table
    console.log('🏢 Creating companies table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS companies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        company_name VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_company_name (company_name)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Companies table created\n');
    
    // Step 6: Create Projects Table
    console.log('📁 Creating projects table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS projects (
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
        FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
        FOREIGN KEY (editor_id) REFERENCES users(id) ON DELETE SET NULL,
        INDEX idx_company_id (company_id),
        INDEX idx_editor_id (editor_id),
        INDEX idx_status (status),
        INDEX idx_payment_status (payment_status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Projects table created\n');
    
    // Step 7: Create Payments Table
    console.log('💳 Creating payments table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        project_id INT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        status ENUM('paid', 'pending') DEFAULT 'pending',
        paid_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
        INDEX idx_project_id (project_id),
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Payments table created\n');
    
    // Step 8: Verify Tables
    console.log('🔍 Verifying tables...');
    const [tables] = await connection.query('SHOW TABLES');
    console.log('✅ Tables created:');
    tables.forEach(table => {
      console.log(`   - ${Object.values(table)[0]}`);
    });
    
    console.log('\n🎉 Database setup complete!\n');
    console.log('💡 Next steps:');
    console.log('   1. Run: npm run seed (to add sample data)');
    console.log('   2. Run: npm run dev (to start server)');
    console.log('   3. Login at: http://localhost:5173/\n');
    
    await connection.end();
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error during setup:', error.message);
    if (connection) await connection.end();
    process.exit(1);
  }
};

setupDatabase();
