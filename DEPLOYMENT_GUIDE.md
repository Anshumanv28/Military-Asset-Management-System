# Deployment Guide for Military Asset Management System

This guide covers deploying the Military Asset Management System to Vercel with both frontend and backend on the same platform.

## Architecture Overview

- **Frontend**: React SPA deployed to Vercel
- **Backend**: Node.js/Express API deployed as Vercel serverless functions
- **Database**: Managed PostgreSQL (Supabase, Railway, or similar)

## Prerequisites

1. GitHub repository with your code
2. Accounts on:
   - Vercel (for both frontend and backend) - [Sign up here](https://vercel.com)
   - Supabase/Railway (for database) - [Supabase](https://supabase.com) or [Railway](https://railway.app)

## Step 1: Database Setup

### Option A: Supabase (Recommended)
1. Go to [Supabase](https://supabase.com) and create a new project
2. Go to SQL Editor and run the schema from `backend/src/database/schema.sql`
3. Copy the database connection string

### Option B: Railway
1. Go to [Railway](https://railway.app) and create a new project
2. Add a PostgreSQL service
3. Copy the database connection string

## Step 2: Deploy to Vercel

### Single Deployment (Recommended)
1. **Connect Repository**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**
   - Framework preset: Other
   - Root directory: `.` (root of the project)
   - Build command: `cd frontend && npm install && npm run build`
   - Output directory: `frontend/build`

3. **Environment Variables**
   - Go to Project settings > Environment Variables
   - Add the following variables:
     ```
     # Database
     DATABASE_URL=your_database_connection_string
     
     # JWT Configuration
     JWT_SECRET=your_super_secure_jwt_secret
     JWT_EXPIRES_IN=24h
     JWT_REFRESH_EXPIRES_IN=7d
     
     # API Configuration
     NODE_ENV=production
     API_VERSION=v1
     ENABLE_SWAGGER=false
     
     # Rate Limiting
     RATE_LIMIT_WINDOW_MS=900000
     RATE_LIMIT_MAX_REQUESTS=5000
     
     # Logging
     LOG_LEVEL=info
     
     # Frontend Configuration
     REACT_APP_API_URL=/api
     REACT_APP_ENV=production
     REACT_APP_ENABLE_ANALYTICS=false
     REACT_APP_ENABLE_DEBUG_MODE=false
     ```

4. **Deploy**
   - Click "Deploy"
   - Your application will be available at `https://your-project-name.vercel.app`

### How It Works

The `vercel.json` configuration file handles the routing:
- All `/api/*` requests are routed to the backend serverless functions
- All other requests are served from the frontend build
- The frontend and backend are deployed together as a single project

## Step 3: Database Seeding

1. Connect to your database
2. Run the seed script or manually insert initial data
3. Create an admin user for initial access

## Step 4: Testing

1. **Frontend Testing**
   - Visit your deployed Vercel URL
   - Test login functionality
   - Verify all pages load correctly
   - Test all CRUD operations

2. **Backend Testing**
   - Test API endpoints using Postman or similar
   - Verify authentication works
   - Check database connections
   - Test health check: `https://your-project.vercel.app/api/health`

## Environment Variables Reference

### Required Environment Variables
```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_key
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d

# API Configuration
NODE_ENV=production
API_VERSION=v1
ENABLE_SWAGGER=false

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=5000

# Logging
LOG_LEVEL=info

# Frontend Configuration
REACT_APP_API_URL=/api
REACT_APP_ENV=production
REACT_APP_ENABLE_ANALYTICS=false
REACT_APP_ENABLE_DEBUG_MODE=false
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - The frontend and backend are on the same domain, so CORS should work automatically
   - If you see CORS errors, check that the API routes are working correctly

2. **Database Connection Issues**
   - Verify `DATABASE_URL` is correct
   - Check if database is accessible from Vercel's serverless functions
   - Some database providers may require IP whitelisting

3. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript compilation errors

4. **API Route Issues**
   - Verify the `vercel.json` configuration is correct
   - Check that the backend API handler is properly exported
   - Test individual API endpoints

### Useful Commands

```bash
# Test locally with Vercel CLI
npm install -g vercel
vercel dev

# Check environment variables
vercel env ls

# View deployment logs
vercel logs
```

## Security Checklist

- [ ] Use strong JWT secrets
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Configure proper CORS origins
- [ ] Set appropriate rate limits
- [ ] Use environment variables for sensitive data
- [ ] Regularly update dependencies
- [ ] Monitor application logs
- [ ] Set up proper backup procedures

## Monitoring and Maintenance

1. **Vercel Dashboard**
   - Monitor function execution times
   - Check for errors in function logs
   - Monitor bandwidth usage

2. **Database Monitoring**
   - Set up monitoring for your database service
   - Configure alerts for downtime or errors
   - Regular backups

3. **Application Monitoring**
   - Use Vercel Analytics (if enabled)
   - Monitor API response times
   - Set up error tracking

## Advantages of Vercel Deployment

1. **Single Platform**: Both frontend and backend on one platform
2. **Automatic HTTPS**: SSL certificates handled automatically
3. **Global CDN**: Fast loading times worldwide
4. **Serverless**: Pay only for what you use
5. **Easy Scaling**: Automatic scaling based on demand
6. **Git Integration**: Automatic deployments from Git
7. **Preview Deployments**: Test changes before going live

## Support

If you encounter issues:
1. Check Vercel function logs in the dashboard
2. Verify environment variables are set correctly
3. Test API endpoints individually
4. Check database connectivity
5. Review the `vercel.json` configuration 