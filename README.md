# Military Asset Management System

A comprehensive web-based system for managing military assets including vehicles, weapons, and ammunition across multiple bases with role-based access control.

## 🎯 Project Overview

The Military Asset Management System enables commanders and logistics personnel to:
- Track asset movements, assignments, and expenditures
- Manage transfers between bases with full audit trails
- Monitor opening/closing balances and net movements
- Ensure accountability through role-based access control

## 🏗️ System Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript + Material-UI
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL 15
- **Authentication**: JWT with RBAC middleware
- **Deployment**: Docker + Docker Compose

### Core Features
1. **Dashboard** - Key metrics with filtering and detailed pop-ups
2. **Purchases** - Asset procurement tracking
3. **Transfers** - Inter-base asset movement
4. **Assignments & Expenditures** - Personnel asset tracking
5. **RBAC** - Role-based access control (Admin, Base Commander, Logistics Officer)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- Docker & Docker Compose (optional)

### Local Development Setup

1. **Clone and Install Dependencies**
```bash
git clone <repository-url>
cd military-asset-management-system

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

2. **Database Setup**
```bash
# Create database
createdb military_assets_db

# Run migrations
cd backend
npm run migrate
npm run seed
```

3. **Environment Configuration**
```bash
# Backend (.env)
cp backend/.env.example backend/.env
# Edit with your database credentials

# Frontend (.env)
cp frontend/.env.example frontend/.env
```

4. **Start Development Servers**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

### Docker Deployment
```bash
docker-compose up -d
```

## 📊 Database Schema

### Core Entities
- **Users** - Authentication and role management
- **Bases** - Military installation locations
- **AssetTypes** - Equipment categories (vehicles, weapons, ammo)
- **Assets** - Individual asset instances
- **Purchases** - Asset procurement records
- **Transfers** - Inter-base movements
- **Assignments** - Personnel asset assignments
- **Expenditures** - Asset consumption tracking
- **AuditLogs** - Transaction history

## 🔐 Role-Based Access Control

### Roles & Permissions
- **Admin**: Full system access
- **Base Commander**: Base-specific data and operations
- **Logistics Officer**: Limited purchase and transfer access

### Security Features
- JWT token authentication
- Role-based API middleware
- Request logging and audit trails
- Input validation and sanitization

## 📱 Features Overview

### Dashboard
- Real-time metrics display
- Date, base, and equipment type filters
- Interactive charts and graphs
- Detailed movement breakdowns

### Asset Management
- Purchase recording and tracking
- Transfer management between bases
- Assignment and expenditure tracking
- Historical data analysis

### Reporting
- Balance sheet reports
- Movement summaries
- Audit trails
- Export capabilities

## 🛠️ Development

### Project Structure
```
military-asset-management-system/
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── middleware/      # Auth & validation
│   │   ├── models/          # Database models
│   │   ├── routes/          # API endpoints
│   │   └── utils/           # Helper functions
│   ├── migrations/          # Database migrations
│   └── seeds/              # Sample data
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API integration
│   │   └── utils/          # Helper functions
│   └── public/             # Static assets
├── docs/                   # Documentation
└── docker-compose.yml      # Container orchestration
```

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User authentication
- `POST /api/auth/refresh` - Token refresh
- `GET /api/auth/profile` - User profile

### Asset Management Endpoints
- `GET /api/assets` - List assets with filters
- `POST /api/assets/purchase` - Record purchase
- `POST /api/assets/transfer` - Initiate transfer
- `POST /api/assets/assign` - Assign asset to personnel
- `POST /api/assets/expend` - Record expenditure

### Dashboard Endpoints
- `GET /api/dashboard/metrics` - Key performance indicators
- `GET /api/dashboard/movements` - Movement breakdowns
- `GET /api/dashboard/balances` - Balance summaries

## 🔍 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

## 📦 Deployment

### Production Build
```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
```

### Environment Variables
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 3001)
- `FRONTEND_URL` - Frontend application URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For technical support or questions, please open an issue in the repository or contact the development team. 