/**
 * Database Seeder
 * Creates initial data for testing
 */

require('dotenv').config();
const { connectDB, sequelize } = require('../config/database');
const { User, Company, Project, Payment } = require('../models');

const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('🌱 Starting database seed...');
    
    // Clear existing data (only in development)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ force: true });
      console.log('✅ Database cleared');
    }
    
    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('✅ Admin created');
    
    // Create editors
    const editor1 = await User.create({
      name: 'John Editor',
      email: 'editor1@example.com',
      password: 'editor123',
      role: 'editor'
    });
    
    const editor2 = await User.create({
      name: 'Sarah Editor',
      email: 'editor2@example.com',
      password: 'editor123',
      role: 'editor'
    });
    console.log('✅ Editors created');
    
    // Create client
    const client = await User.create({
      name: 'Client User',
      email: 'client@example.com',
      password: 'client123',
      role: 'client'
    });
    console.log('✅ Client created');
    
    // Create companies
    const companies = await Company.bulkCreate([
      { company_name: 'Royal Wedding Events' },
      { company_name: 'Elegant Moments Photography' },
      { company_name: 'Perfect Day Studios' }
    ]);
    console.log('✅ Companies created');
    
    // Create projects
    const projects = await Project.bulkCreate([
      {
        company_id: companies[0].id,
        client_name: 'Rahul & Priya',
        project_type: 'wedding',
        editor_id: editor1.id,
        shoot_date: new Date('2024-12-15'),
        delivery_date: new Date('2025-01-15'),
        status: 'in_progress',
        payment_status: 'pending',
        amount: 50000,
        notes: 'Wedding ceremony and reception'
      },
      {
        company_id: companies[1].id,
        client_name: 'Amit & Neha',
        project_type: 'pre-shoot',
        editor_id: editor2.id,
        shoot_date: new Date('2024-11-20'),
        delivery_date: new Date('2024-12-20'),
        status: 'completed',
        payment_status: 'paid',
        amount: 15000,
        notes: 'Pre-wedding photo shoot'
      },
      {
        company_id: companies[2].id,
        client_name: 'Vikram & Anjali',
        project_type: 'reel',
        editor_id: editor1.id,
        shoot_date: new Date('2025-01-10'),
        delivery_date: new Date('2025-01-25'),
        status: 'pending',
        payment_status: 'pending',
        amount: 8000,
        notes: 'Instagram reels'
      },
      {
        company_id: companies[0].id,
        client_name: 'Rohan & Kavya',
        project_type: 'album',
        editor_id: editor2.id,
        shoot_date: new Date('2024-10-05'),
        delivery_date: new Date('2024-11-05'),
        status: 'completed',
        payment_status: 'paid',
        amount: 25000,
        notes: 'Wedding album design'
      }
    ]);
    console.log('✅ Projects created');
    
    // Create payments for completed projects
    await Payment.bulkCreate([
      {
        project_id: projects[1].id,
        amount: 15000,
        status: 'paid',
        paid_date: new Date('2024-12-21')
      },
      {
        project_id: projects[3].id,
        amount: 25000,
        status: 'paid',
        paid_date: new Date('2024-11-06')
      }
    ]);
    console.log('✅ Payments created');
    
    console.log('\n🎉 Database seeded successfully!');
    console.log('\n📝 Login Credentials:');
    console.log('Admin: admin@example.com / admin123');
    console.log('Editor 1: editor1@example.com / editor123');
    console.log('Editor 2: editor2@example.com / editor123');
    console.log('Client: client@example.com / client123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
