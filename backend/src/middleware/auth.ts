import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { query } from '../database/connection';
import { logger } from '../utils/logger';

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        user_id: string;
        email: string;
        role: string;
        base_id?: string;
      };
    }
  }
}

// Verify JWT token
export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        error: 'Access token required'
      });
      return;
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env['JWT_SECRET']!) as { user_id: string };
    
    // Get user details from database
    const userResult = await query(
      'SELECT id, email, role, base_id FROM users WHERE id = $1',
      [decoded.user_id]
    );

    if (userResult.rows.length === 0) {
      res.status(401).json({
        success: false,
        error: 'Invalid token'
      });
      return;
    }

    const user = userResult.rows[0];
    req.user = {
      user_id: user.id,
      email: user.email,
      role: user.role,
      base_id: user.base_id
    };

    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    res.status(401).json({
      success: false,
      error: 'Invalid token'
    });
  }
};

// Role-based authorization
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: 'Insufficient permissions'
      });
      return;
    }

    next();
  };
};

// Optional authentication (doesn't fail if no token)
export const optionalAuth = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      next();
      return;
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env['JWT_SECRET']!) as { user_id: string };
    
    // Get user details from database
    const userResult = await query(
      'SELECT id, email, role, base_id FROM users WHERE id = $1',
      [decoded.user_id]
    );

    if (userResult.rows.length > 0) {
      const user = userResult.rows[0];
      req.user = {
        user_id: user.id,
        email: user.email,
        role: user.role,
        base_id: user.base_id
      };
    }

    next();
  } catch (error) {
    // Don't fail on token errors, just continue without user
    next();
  }
};

export const authorizeBaseAccess = (baseIdParam: string = 'base_id') => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Authentication required'
      });
      return;
    }

    // Admin has access to all bases
    if (req.user.role === 'admin') {
      next();
      return;
    }

    const baseId = req.params[baseIdParam] || req.body[baseIdParam];
    
    if (!baseId) {
      res.status(400).json({
        success: false,
        error: 'Base ID required'
      });
      return;
    }

    // Base commanders can only access their assigned base
    if (req.user.role === 'base_commander' && req.user.base_id !== baseId) {
      res.status(403).json({
        success: false,
        error: 'Access denied to this base'
      });
      return;
    }

    // Logistics officers have limited access
    if (req.user.role === 'logistics_officer') {
      // They can view data but with restrictions
      next();
      return;
    }

    next();
  };
}; 