import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Log the error
  logger.error('Error occurred:', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Default error response
  const errorResponse = {
    success: false,
    error: 'Internal server error'
  };

  // Handle specific error types
  if (err.name === 'ValidationError') {
    res.status(400).json({
      success: false,
      error: 'Validation error',
      details: err.message
    });
    return;
  }

  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      success: false,
      error: 'Unauthorized'
    });
    return;
  }

  if (err.name === 'ForbiddenError') {
    res.status(403).json({
      success: false,
      error: 'Forbidden'
    });
    return;
  }

  if (err.name === 'NotFoundError') {
    res.status(404).json({
      success: false,
      error: 'Resource not found'
    });
    return;
  }

  // Handle database errors
  if (err.message.includes('duplicate key')) {
    res.status(409).json({
      success: false,
      error: 'Resource already exists'
    });
    return;
  }

  if (err.message.includes('foreign key')) {
    res.status(400).json({
      success: false,
      error: 'Invalid reference'
    });
    return;
  }

  // In development, include stack trace
  if (process.env['NODE_ENV'] === 'development') {
    res.status(500).json({
      ...errorResponse,
      stack: err.stack
    });
    return;
  }

  // Production error response
  res.status(500).json(errorResponse);
}; 