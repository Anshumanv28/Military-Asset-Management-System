import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { testConnection } from './database/connection';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env['PORT'] || 3001;

// Trust proxy for Vercel deployment (fixes rate limiting issues)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://military-asset-management-system-7vex3fwvi.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env['RATE_LIMIT_WINDOW_MS'] || '900000'), // 15 minutes
  max: parseInt(process.env['RATE_LIMIT_MAX_REQUESTS'] || '5000'), // limit each IP to 5000 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use(morgan('combined', {
  stream: {
    write: (message: string) => logger.info(message.trim())
  }
}));

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env['NODE_ENV'],
    version: 'v1'
  });
});

// API health check endpoint for deployment platforms
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env['NODE_ENV'],
    version: process.env['API_VERSION'] || 'v1'
  });
});

// Database health check endpoint (separate from basic health)
app.get('/api/health/db', async (_req, res) => {
  try {
    await testConnection();
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      environment: process.env['NODE_ENV'],
      database: 'connected'
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      environment: process.env['NODE_ENV'],
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Import routes
import authRoutes from './routes/auth';
import dashboardRoutes from './routes/dashboard';
import assetsRoutes from './routes/assets';
import purchasesRoutes from './routes/purchases';
import transfersRoutes from './routes/transfers';
import assignmentsRoutes from './routes/assignments';
import expendituresRoutes from './routes/expenditures';
import basesRoutes from './routes/bases';
import personnelRoutes from './routes/personnel';
import usersRoutes from './routes/users';

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/assets', assetsRoutes);
app.use('/api/purchases', purchasesRoutes);
app.use('/api/transfers', transfersRoutes);
app.use('/api/assignments', assignmentsRoutes);
app.use('/api/expenditures', expendituresRoutes);
app.use('/api/bases', basesRoutes);
app.use('/api/personnel', personnelRoutes);
app.use('/api/users', usersRoutes);

// Handle favicon requests
app.get('/favicon.ico', (_req, res) => {
  res.status(404).json({
    success: false,
    error: 'Favicon not found'
  });
});

app.get('/favicon.png', (_req, res) => {
  res.status(404).json({
    success: false,
    error: 'Favicon not found'
  });
});

// Root endpoint
app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Military Asset Management System API',
    version: 'v1',
    endpoints: {
      health: '/api/health',
      database: '/api/health/db',
      docs: 'API documentation available at /api/* endpoints'
    }
  });
});

// 404 handler
app.use('*', (_req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Test database connection
    await testConnection();
    
    app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`📊 Environment: ${process.env['NODE_ENV']}`);
      logger.info(`🔗 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Only start the server if not in serverless environment
if (process.env['NODE_ENV'] !== 'production' || !process.env['VERCEL']) {
  startServer();
}

// Export for Vercel serverless functions
export default app; 