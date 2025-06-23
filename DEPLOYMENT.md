# Production Deployment Checklist

## Pre-Deployment

- [ ] Update JWT_SECRET in backend/env.production
- [ ] Update DATABASE_URL with production credentials
- [ ] Update CORS_ORIGIN with production domain
- [ ] Update REACT_APP_API_URL with production API URL
- [ ] Ensure all environment variables are properly set
- [ ] Test database connection
- [ ] Verify Docker and Docker Compose are installed

## Security Checklist

- [ ] Change default database passwords
- [ ] Use strong JWT secret
- [ ] Enable HTTPS in production
- [ ] Configure proper CORS origins
- [ ] Set appropriate rate limits
- [ ] Disable debug mode
- [ ] Configure proper logging levels

## Deployment Steps

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd Military-Asset-Management-System
   ```

2. **Configure environment**
   ```bash
   cp backend/env.production backend/.env
   cp frontend/env.production frontend/.env
   # Edit .env files with production values
   ```

3. **Deploy with Docker**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

4. **Verify deployment**
   - Check service health: http://localhost:3001/health
   - Access frontend: http://localhost:3000
   - Test authentication
   - Verify all features work

## Post-Deployment

- [ ] Monitor application logs
- [ ] Check database performance
- [ ] Verify backup procedures
- [ ] Test all user roles and permissions
- [ ] Monitor resource usage
- [ ] Set up monitoring and alerting

## Troubleshooting

- Check Docker logs: `docker-compose -f docker-compose.prod.yml logs`
- Verify database connection
- Check environment variables
- Monitor application health endpoint 