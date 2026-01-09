# Video & Photo Editing Company - Backend API

Production-ready REST API for managing video & photo editing projects with role-based authentication.

## Features

- **JWT Authentication** - Secure token-based auth
- **Role-Based Access** - Admin, Editor, Client roles
- **MySQL Database** - Sequelize ORM
- **RESTful APIs** - Complete CRUD operations
- **Project Management** - Track projects, payments, status
- **Monthly Reports** - Revenue and payment analytics

## Tech Stack

- Node.js & Express.js
- MySQL with Sequelize ORM
- JWT & bcrypt
- RESTful API design

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Database

Create a MySQL database:

```sql
CREATE DATABASE editing_company_db;
```

### 3. Environment Variables

Copy `.env.example` to `.env` and configure:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_NAME=editing_company_db
DB_USER=root
DB_PASSWORD=your_password

JWT_SECRET=your-secret-key
```

### 4. Seed Database

```bash
npm run seed
```

This creates:
- Admin user
- 2 Editors
- 1 Client
- Sample companies and projects

### 5. Start Server

```bash
# Development
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5000`

## API Endpoints

### Authentication

```
POST   /api/auth/register   - Register new user
POST   /api/auth/login      - Login user
GET    /api/auth/me         - Get current user
```

### Users (Admin only)

```
GET    /api/users           - Get all users
GET    /api/users/editors   - Get all editors
POST   /api/users           - Create new user
DELETE /api/users/:id       - Delete user
```

### Projects

```
GET    /api/projects        - Get all projects (filtered by role)
GET    /api/projects/:id    - Get single project
POST   /api/projects        - Create project (Admin)
PUT    /api/projects/:id    - Update project
DELETE /api/projects/:id    - Delete project (Admin)
GET    /api/projects/stats  - Get project statistics (Admin)
```

### Companies

```
GET    /api/companies       - Get all companies
POST   /api/companies       - Create company (Admin)
```

### Payments (Admin only)

```
POST   /api/payments        - Create payment
PUT    /api/payments/:id    - Update payment
GET    /api/payments/monthly - Get monthly report
```

## Login Credentials (After Seeding)

**Admin:**
- Email: admin@example.com
- Password: admin123

**Editor:**
- Email: editor1@example.com
- Password: editor123

**Client:**
- Email: client@example.com
- Password: client123

## Database Schema

See `database.sql` for complete schema

## Security

- Passwords hashed with bcrypt
- JWT tokens for authentication
- Role-based middleware protection
- SQL injection prevention with Sequelize
