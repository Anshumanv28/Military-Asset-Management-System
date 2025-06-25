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

- Node.js 18+ (for development)
- PostgreSQL database (Supabase, Railway, or similar)

### Production Deployment

The application is designed to be deployed on Vercel with both frontend and backend on the same platform.

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Military-Asset-Management-System
   ```

2. **Set up database**
   - Create a PostgreSQL database (Supabase recommended)
   - Run the schema from `backend/src/database/schema.sql`

3. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Configure environment variables (see DEPLOYMENT_GUIDE.md)
   - Deploy automatically

4. **Access the application**
   - Your application will be available at `https://your-project.vercel.app`
   - API endpoints: `https://your-project.vercel.app/api/*`
   - Health Check: `https://your-project.vercel.app/api/health`

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

2. **Set up environment variables**
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   # Edit backend/.env with your database connection
   
   # Frontend
   cp frontend/.env.example frontend/.env
   # Edit frontend/.env with your API URL
   ```

3. **Start development servers**
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
- **Deployment**: Vercel (Frontend + Backend serverless functions)

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

## Deployment

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).

## License

MIT License 