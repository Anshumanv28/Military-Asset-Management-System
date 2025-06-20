# Military Asset Management System - Project Documentation

## 1. Project Overview

### Description
The Military Asset Management System is a comprehensive web-based platform designed to enable commanders and logistics personnel to manage the movement, assignment, and expenditure of critical military assets across multiple bases. The system provides real-time tracking, role-based access control, and comprehensive audit trails to ensure accountability and transparency in military asset management.

### Key Features
- **Real-time Dashboard**: Display key metrics including opening/closing balances, net movements, and asset status
- **Asset Tracking**: Complete lifecycle management from purchase to retirement
- **Transfer Management**: Inter-base asset movement with approval workflows
- **Assignment Tracking**: Personnel asset assignments with return tracking
- **Expenditure Management**: Asset consumption and usage tracking
- **Role-Based Access Control**: Secure access based on user roles and base assignments
- **Audit Logging**: Comprehensive transaction history for compliance

### Assumptions
- Military bases have stable internet connectivity
- Users are trained military personnel
- Asset serial numbers are unique across the system
- Base commanders have authority over their assigned base
- Logistics officers have limited but necessary access for operations

### Limitations
- Requires internet connectivity for real-time updates
- No offline mode currently implemented
- Limited to web-based interface (no mobile app)
- Asset tracking is manual entry (no barcode/RFID integration)
- No integration with external military systems

## 2. Tech Stack & Architecture

### Backend Technology
- **Runtime**: Node.js 18+ with TypeScript
- **Framework**: Express.js for RESTful API
- **Database**: PostgreSQL 15 (Relational Database)
- **Authentication**: JWT with refresh tokens
- **Validation**: Express-validator and Joi
- **Logging**: Winston for structured logging
- **Security**: Helmet, CORS, Rate limiting

**Justification**: Node.js provides excellent performance for I/O-intensive operations, TypeScript ensures type safety, PostgreSQL offers ACID compliance and complex query capabilities needed for military asset tracking.

### Frontend Technology
- **Framework**: React 18 with TypeScript
- **UI Library**: Material-UI (MUI) for consistent design
- **State Management**: React Context API
- **HTTP Client**: Axios for API communication
- **Charts**: Recharts for data visualization
- **Routing**: React Router for navigation

**Justification**: React provides component reusability and maintainability, Material-UI ensures professional military-grade UI, TypeScript prevents runtime errors.

### Database Choice: PostgreSQL
**Why PostgreSQL over NoSQL:**
- **ACID Compliance**: Critical for military asset tracking where data integrity is paramount
- **Complex Relationships**: Military assets have complex relationships (bases, users, transfers, assignments)
- **Transaction Support**: Multi-step operations like transfers require transaction support
- **Audit Requirements**: Military systems require detailed audit trails with referential integrity
- **Reporting**: Complex reporting and analytics needed for military oversight

### Architecture Pattern
- **Layered Architecture**: Separation of concerns with controllers, services, and data layers
- **RESTful API**: Standard HTTP methods for resource management
- **Microservices Ready**: Modular design allows future microservice decomposition
- **Containerized**: Docker for consistent deployment across environments

## 3. Data Models / Schema

### Core Entities

#### Users Table
```sql
- id (UUID, Primary Key)
- username (VARCHAR, Unique)
- email (VARCHAR, Unique)
- password_hash (VARCHAR)
- first_name (VARCHAR)
- last_name (VARCHAR)
- role (ENUM: admin, base_commander, logistics_officer)
- base_id (UUID, Foreign Key to bases)
- is_active (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### Bases Table
```sql
- id (UUID, Primary Key)
- name (VARCHAR)
- code (VARCHAR, Unique)
- location (VARCHAR)
- commander_id (UUID, Foreign Key to users)
- is_active (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### Asset Types Table
```sql
- id (UUID, Primary Key)
- name (VARCHAR)
- category (ENUM: vehicle, weapon, ammunition, equipment)
- description (TEXT)
- unit_of_measure (VARCHAR)
- is_active (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### Assets Table
```sql
- id (UUID, Primary Key)
- asset_type_id (UUID, Foreign Key to asset_types)
- serial_number (VARCHAR, Unique)
- name (VARCHAR)
- description (TEXT)
- current_base_id (UUID, Foreign Key to bases)
- status (ENUM: available, assigned, maintenance, retired)
- purchase_date (DATE)
- purchase_cost (DECIMAL)
- current_value (DECIMAL)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### Purchases Table
```sql
- id (UUID, Primary Key)
- asset_type_id (UUID, Foreign Key to asset_types)
- base_id (UUID, Foreign Key to bases)
- quantity (INTEGER)
- unit_cost (DECIMAL)
- total_cost (DECIMAL)
- supplier (VARCHAR)
- purchase_date (DATE)
- delivery_date (DATE)
- purchase_order_number (VARCHAR)
- notes (TEXT)
- created_by (UUID, Foreign Key to users)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### Transfers Table
```sql
- id (UUID, Primary Key)
- transfer_number (VARCHAR, Unique)
- from_base_id (UUID, Foreign Key to bases)
- to_base_id (UUID, Foreign Key to bases)
- asset_type_id (UUID, Foreign Key to asset_types)
- quantity (INTEGER)
- transfer_date (DATE)
- status (ENUM: pending, approved, in_transit, completed, cancelled)
- approved_by (UUID, Foreign Key to users)
- approved_at (TIMESTAMP)
- notes (TEXT)
- created_by (UUID, Foreign Key to users)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### Assignments Table
```sql
- id (UUID, Primary Key)
- asset_id (UUID, Foreign Key to assets)
- assigned_to (VARCHAR)
- assigned_by (UUID, Foreign Key to users)
- base_id (UUID, Foreign Key to bases)
- assignment_date (DATE)
- return_date (DATE)
- status (ENUM: active, returned, lost, damaged)
- notes (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### Expenditures Table
```sql
- id (UUID, Primary Key)
- asset_type_id (UUID, Foreign Key to asset_types)
- base_id (UUID, Foreign Key to bases)
- quantity (INTEGER)
- expenditure_date (DATE)
- reason (VARCHAR)
- authorized_by (UUID, Foreign Key to users)
- notes (TEXT)
- created_by (UUID, Foreign Key to users)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### Audit Logs Table
```sql
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key to users)
- action (VARCHAR)
- table_name (VARCHAR)
- record_id (UUID)
- old_values (JSONB)
- new_values (JSONB)
- ip_address (INET)
- user_agent (TEXT)
- created_at (TIMESTAMP)
```

### Relationships
- Users can be assigned to one base (base_commander role)
- Assets belong to one asset type and one current base
- Purchases are linked to asset types and bases
- Transfers connect two bases for asset movement
- Assignments link assets to personnel
- All transactions are audited through audit_logs

## 4. RBAC Explanation

### Role Definitions

#### Admin Role
- **Access Level**: Full system access
- **Permissions**:
  - View all data across all bases
  - Create, update, delete any asset
  - Manage all transfers and assignments
  - Create new users and bases
  - Access audit logs
  - System configuration

#### Base Commander Role
- **Access Level**: Base-specific access
- **Permissions**:
  - View data only for assigned base
  - Create/update assets for assigned base
  - Approve transfers from assigned base
  - Manage assignments within assigned base
  - View base-specific reports
  - Cannot access other bases' data

#### Logistics Officer Role
- **Access Level**: Limited operational access
- **Permissions**:
  - View assigned base data
  - Create purchases for assigned base
  - Initiate transfers (requires approval)
  - Record expenditures
  - Limited asset management
  - Cannot approve transfers or manage users

### Enforcement Method

#### Middleware Implementation
```typescript
// Authentication middleware
export const authenticate = async (req, res, next) => {
  // Verify JWT token
  // Check user exists and is active
  // Attach user to request
}

// Role-based authorization
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}

// Base-specific access control
export const authorizeBaseAccess = (baseIdParam) => {
  return async (req, res, next) => {
    const baseId = req.params[baseIdParam] || req.body[baseIdParam];
    
    if (req.user.role === 'admin') return next();
    
    if (req.user.role === 'base_commander' && req.user.base_id !== baseId) {
      return res.status(403).json({ error: 'Access denied to this base' });
    }
    
    next();
  };
}
```

#### Database-Level Security
- Row-level security through application logic
- User base_id filtering in queries
- Audit logging of all access attempts

## 5. API Logging

### Transaction Logging Implementation

#### Audit Log Structure
```typescript
interface AuditLog {
  id: string;
  user_id?: string;
  action: string;           // CREATE, UPDATE, DELETE, LOGIN, etc.
  table_name: string;       // users, assets, transfers, etc.
  record_id?: string;       // ID of affected record
  old_values?: any;         // Previous state (JSONB)
  new_values?: any;         // New state (JSONB)
  ip_address?: string;      // Client IP
  user_agent?: string;      // Browser/client info
  created_at: Date;         // Timestamp
}
```

#### Logging Strategy
1. **Automatic Logging**: All CRUD operations automatically logged
2. **Authentication Events**: Login, logout, token refresh logged
3. **Authorization Failures**: Failed access attempts logged
4. **Data Changes**: Before/after state captured for updates
5. **User Context**: IP address and user agent captured

#### Implementation Examples
```typescript
// Asset creation logging
const createAsset = async (assetData, userId) => {
  const asset = await query('INSERT INTO assets ... RETURNING *');
  
  await logAuditEvent({
    user_id: userId,
    action: 'ASSET_CREATED',
    table_name: 'assets',
    record_id: asset.id,
    new_values: asset,
    ip_address: req.ip,
    user_agent: req.get('User-Agent')
  });
  
  return asset;
};

// Transfer approval logging
const approveTransfer = async (transferId, approverId) => {
  const oldTransfer = await getTransfer(transferId);
  const updatedTransfer = await updateTransferStatus(transferId, 'approved');
  
  await logAuditEvent({
    user_id: approverId,
    action: 'TRANSFER_APPROVED',
    table_name: 'transfers',
    record_id: transferId,
    old_values: oldTransfer,
    new_values: updatedTransfer
  });
};
```

#### Log Analysis Capabilities
- Track user activity patterns
- Identify unauthorized access attempts
- Monitor data changes over time
- Generate compliance reports
- Investigate security incidents

## 6. Setup Instructions

### Prerequisites
- Node.js 18+ installed
- PostgreSQL 15+ installed
- Git installed
- Docker and Docker Compose (optional)

### Quick Start with Docker
```bash
# 1. Clone repository
git clone <repository-url>
cd military-asset-management-system

# 2. Copy environment files
cp backend/env.example backend/.env
cp frontend/env.example frontend/.env

# 3. Start services
docker-compose up -d

# 4. Initialize database
docker-compose exec backend npm run migrate
docker-compose exec backend npm run seed

# 5. Access application
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
```

### Manual Setup
```bash
# Backend Setup
cd backend
npm install
cp env.example .env
# Edit .env with database credentials
npm run migrate
npm run seed
npm run dev

# Frontend Setup
cd frontend
npm install
cp env.example .env
npm start
```

### Database Setup
```bash
# Create database
createdb military_assets_db

# Run migrations
npm run migrate

# Seed with sample data
npm run seed
```

### Environment Configuration
```bash
# Backend (.env)
DATABASE_URL=postgresql://user:pass@localhost:5432/military_assets_db
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
PORT=3001

# Frontend (.env)
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_ENV=development
```

## 7. API Endpoints

### Authentication Endpoints
```http
POST /api/auth/login
Content-Type: application/json
{
  "username": "admin",
  "password": "admin123"
}

POST /api/auth/refresh
Content-Type: application/json
{
  "refreshToken": "jwt-refresh-token"
}

GET /api/auth/profile
Authorization: Bearer <jwt-token>
```

### Dashboard Endpoints
```http
GET /api/dashboard/metrics?start_date=2024-01-01&end_date=2024-12-31
Authorization: Bearer <jwt-token>

GET /api/dashboard/movements?base_id=uuid
Authorization: Bearer <jwt-token>

GET /api/dashboard/balances
Authorization: Bearer <jwt-token>
```

### Asset Management Endpoints
```http
GET /api/assets?base_id=uuid&status=available&page=1&limit=10
Authorization: Bearer <jwt-token>

POST /api/assets
Authorization: Bearer <jwt-token>
Content-Type: application/json
{
  "asset_type_id": "uuid",
  "serial_number": "M4-001",
  "name": "M4 Carbine #001",
  "current_base_id": "uuid"
}

PUT /api/assets/:id
Authorization: Bearer <jwt-token>
Content-Type: application/json
{
  "status": "assigned",
  "current_value": 2500.00
}
```

### Purchase Management Endpoints
```http
GET /api/purchases?base_id=uuid&asset_type_id=uuid
Authorization: Bearer <jwt-token>

POST /api/purchases
Authorization: Bearer <jwt-token>
Content-Type: application/json
{
  "asset_type_id": "uuid",
  "base_id": "uuid",
  "quantity": 100,
  "unit_cost": 0.50,
  "supplier": "AmmoCorp",
  "purchase_date": "2024-01-15"
}
```

### Transfer Management Endpoints
```http
GET /api/transfers?from_base_id=uuid&status=pending
Authorization: Bearer <jwt-token>

POST /api/transfers
Authorization: Bearer <jwt-token>
Content-Type: application/json
{
  "from_base_id": "uuid",
  "to_base_id": "uuid",
  "asset_type_id": "uuid",
  "quantity": 50,
  "transfer_date": "2024-02-15"
}

PUT /api/transfers/:id/approve
Authorization: Bearer <jwt-token>
```

### Response Format
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### Error Response Format
```json
{
  "success": false,
  "error": "Error message",
  "details": {
    // Additional error details
  }
}
```

## 8. Security Features

### Authentication Security
- JWT tokens with configurable expiration
- Refresh token rotation
- Password hashing with bcrypt
- Account lockout protection
- Session management

### Authorization Security
- Role-based access control (RBAC)
- Base-specific data isolation
- API endpoint protection
- Input validation and sanitization
- SQL injection prevention

### Data Security
- HTTPS enforcement in production
- Database connection encryption
- Audit logging of all operations
- Data backup and recovery
- Secure environment variable management

### Network Security
- CORS configuration
- Rate limiting
- Request size limits
- Security headers (Helmet)
- IP address logging

## 9. Performance Considerations

### Database Optimization
- Indexed foreign keys and frequently queried columns
- Query optimization for complex joins
- Connection pooling
- Prepared statements
- Database partitioning for large datasets

### Application Performance
- API response caching
- Pagination for large datasets
- Lazy loading of components
- Image optimization
- Bundle size optimization

### Scalability
- Horizontal scaling with load balancers
- Database read replicas
- Microservices architecture ready
- Container orchestration support
- Auto-scaling capabilities

## 10. Future Enhancements

### Planned Features
- Mobile application (React Native)
- Barcode/RFID integration
- Real-time notifications
- Advanced reporting and analytics
- Integration with external military systems
- Offline mode support
- Multi-language support

### Technical Improvements
- GraphQL API for flexible queries
- WebSocket for real-time updates
- Microservices decomposition
- Kubernetes deployment
- CI/CD pipeline automation
- Automated testing suite
- Performance monitoring

### Security Enhancements
- Two-factor authentication
- Advanced threat detection
- Data encryption at rest
- Compliance certifications
- Penetration testing
- Security audit tools

This comprehensive documentation provides a complete overview of the Military Asset Management System, covering all aspects from technical implementation to security considerations and future roadmap. 