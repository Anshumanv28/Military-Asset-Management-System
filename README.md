# Military Asset Management System

A comprehensive asset management system designed for military organizations to track, manage, and maintain their equipment and resources.

## Features

- **Asset Management**: Track equipment quantities, locations, and status
- **Purchase Management**: Manage procurement requests and approvals
- **Transfer System**: Handle asset transfers between bases
- **Assignment Tracking**: Assign assets to personnel
- **Expenditure Tracking**: Monitor asset consumption and usage
- **Role-Based Access**: Admin, Base Commander, and Logistics Officer roles
- **Dashboard Analytics**: Real-time insights and reporting

## Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for development)
- PostgreSQL 15+

### Production Deployment

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Military-Asset-Management-System
   ```

2. **Configure environment variables**
   ```bash
   # Backend
   cp backend/env.example backend/.env
   # Edit backend/.env with your production values
   
   # Frontend
   cp frontend/env.example frontend/.env
   # Edit frontend/.env with your production values
   ```

3. **Deploy with Docker**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Health Check: http://localhost:3001/health

### Development Setup

1. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd frontend
   npm install
   ```

2. **Start development servers**
   ```bash
   # Backend (Terminal 1)
   cd backend
   npm run dev
   
   # Frontend (Terminal 2)
   cd frontend
   npm start
   ```

## Architecture

- **Frontend**: React 18 with TypeScript, Material-UI
- **Backend**: Node.js with Express, TypeScript
- **Database**: PostgreSQL
- **Authentication**: JWT-based
- **Deployment**: Docker containers

## API Documentation

The API provides endpoints for:
- Authentication (`/api/auth`)
- Asset management (`/api/assets`)
- Purchase management (`/api/purchases`)
- Transfer management (`/api/transfers`)
- Assignment tracking (`/api/assignments`)
- Expenditure tracking (`/api/expenditures`)
- Dashboard analytics (`/api/dashboard`)

## Security

- JWT-based authentication
- Role-based access control
- Rate limiting
- CORS protection
- Input validation
- SQL injection prevention

## License

MIT License 