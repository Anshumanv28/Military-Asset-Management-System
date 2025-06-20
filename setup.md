# Military Asset Management System - Setup Guide

## 🚀 Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed
- Git

### 1. Clone and Setup
```bash
git clone <repository-url>
cd military-asset-management-system
```

### 2. Environment Configuration
```bash
# Copy environment files
cp backend/env.example backend/.env
cp frontend/env.example frontend/.env

# Edit backend/.env with your database credentials
# Edit frontend/.env if needed
```

### 3. Start the System
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 4. Initialize Database
```bash
# Run migrations
docker-compose exec backend npm run migrate

# Seed with sample data
docker-compose exec backend npm run seed
```

### 5. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health

## 🔧 Manual Setup

### Backend Setup

1. **Install Dependencies**
```bash
cd backend
npm install
```

2. **Database Setup**
```bash
# Create PostgreSQL database
createdb military_assets_db

# Run migrations
npm run migrate

# Seed data
npm run seed
```

3. **Environment Configuration**
```bash
cp env.example .env
# Edit .env with your database credentials
```

4. **Start Development Server**
```bash
npm run dev
```

### Frontend Setup

1. **Install Dependencies**
```bash
cd frontend
npm install
```

2. **Environment Configuration**
```bash
cp env.example .env
# Edit .env if needed
```

3. **Start Development Server**
```bash
npm start
```

## 📊 Database Schema

The system uses PostgreSQL with the following core tables:

- **users** - Authentication and role management
- **bases** - Military installation locations
- **asset_types** - Equipment categories
- **assets** - Individual asset instances
- **purchases** - Asset procurement records
- **transfers** - Inter-base movements
- **assignments** - Personnel asset assignments
- **expenditures** - Asset consumption tracking
- **audit_logs** - Transaction history

## 🔐 Authentication & Roles

### Demo Users
- **Admin**: `admin` / `admin123`
- **Base Commander**: `commander1` / `password123`
- **Logistics Officer**: `logistics1` / `password123`

### Role Permissions
- **Admin**: Full system access
- **Base Commander**: Base-specific data and operations
- **Logistics Officer**: Limited purchase and transfer access

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev          # Start development server
npm test            # Run tests
npm run lint        # Lint code
npm run build       # Build for production
```

### Frontend Development
```bash
cd frontend
npm start           # Start development server
npm test            # Run tests
npm run build       # Build for production
```

### Database Operations
```bash
# Run migrations
npm run migrate

# Seed database
npm run seed

# Reset database (development only)
npm run reset
```

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User authentication
- `POST /api/auth/refresh` - Token refresh
- `GET /api/auth/profile` - User profile

### Dashboard Endpoints
- `GET /api/dashboard/metrics` - Key performance indicators
- `GET /api/dashboard/movements` - Movement breakdowns
- `GET /api/dashboard/balances` - Balance summaries

### Asset Management Endpoints
- `GET /api/assets` - List assets with filters
- `POST /api/assets` - Create new asset
- `PUT /api/assets/:id` - Update asset
- `DELETE /api/assets/:id` - Delete asset

### Purchase Management Endpoints
- `GET /api/purchases` - List purchases with filters
- `POST /api/purchases` - Create new purchase

### Transfer Management Endpoints
- `GET /api/transfers` - List transfers with filters
- `POST /api/transfers` - Create new transfer
- `PUT /api/transfers/:id/approve` - Approve transfer

### Assignment Management Endpoints
- `GET /api/assignments` - List assignments with filters
- `POST /api/assignments` - Create new assignment
- `PUT /api/assignments/:id/return` - Return assigned asset

### Expenditure Management Endpoints
- `GET /api/expenditures` - List expenditures with filters
- `POST /api/expenditures` - Create new expenditure

### Base Management Endpoints
- `GET /api/bases` - List bases
- `POST /api/bases` - Create new base

## 🔍 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check PostgreSQL is running
   - Verify database credentials in `.env`
   - Ensure database exists

2. **Port Already in Use**
   - Change ports in `docker-compose.yml`
   - Kill processes using ports 3000/3001

3. **Build Failures**
   - Clear node_modules and reinstall
   - Check Node.js version (18+ required)
   - Verify all dependencies are installed

4. **Authentication Issues**
   - Check JWT_SECRET in backend `.env`
   - Verify token expiration settings
   - Clear browser localStorage

### Logs and Debugging
```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend

# Follow logs in real-time
docker-compose logs -f
```

## 🚀 Deployment

### Production Deployment
1. Set `NODE_ENV=production` in environment
2. Use production database
3. Configure proper JWT secrets
4. Set up SSL certificates
5. Configure reverse proxy (nginx)

### Environment Variables
```bash
# Backend (.env)
DATABASE_URL=postgresql://user:pass@host:port/db
JWT_SECRET=your-secret-key
NODE_ENV=production
PORT=3001

# Frontend (.env)
REACT_APP_API_URL=https://your-api-domain.com/api
REACT_APP_ENV=production
```

## 📚 Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [React Documentation](https://reactjs.org/docs/)
- [Material-UI Documentation](https://mui.com/)

## 🤝 Support

For technical support or questions:
1. Check the troubleshooting section
2. Review logs for error messages
3. Create an issue in the repository
4. Contact the development team 