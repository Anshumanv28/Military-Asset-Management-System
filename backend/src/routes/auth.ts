import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../database/connection';
import { authenticate } from '../middleware/auth';
import { logger } from '../utils/logger';

const router = Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('first_name').notEmpty().trim(),
  body('last_name').notEmpty().trim(),
  body('role').isIn(['admin', 'base_commander', 'logistics_officer']),
  body('base_id').optional().isUUID()
], async (req: Request, res: Response): Promise<void> => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        error: errors.array()[0]?.msg || 'Validation error'
      });
      return;
    }

    const { email, password, first_name, last_name, role, base_id } = req.body;

    // Check if user already exists
    const existingUser = await query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      res.status(400).json({
        success: false,
        error: 'User already exists'
      });
      return;
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const result = await query(
      'INSERT INTO users (email, password_hash, first_name, last_name, role, base_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, email, first_name, last_name, role, base_id',
      [email, hashedPassword, first_name, last_name, role, base_id || null]
    );

    const user = result.rows[0];

    // Generate JWT token
    const token = jwt.sign(
      { user_id: user.id },
      process.env['JWT_SECRET']!
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { user_id: user.id },
      process.env['JWT_SECRET']!
    );

    // Log user registration
    logger.info({
      action: 'USER_REGISTERED',
      user_id: user.id,
      email: user.email,
      role: user.role
    });

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          base_id: user.base_id
        },
        token,
        refreshToken
      }
    });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], async (req: Request, res: Response): Promise<void> => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMsg = errors.array()[0]?.msg || 'Validation error';
      logger.warn('Login validation failed', { email: req.body.email, error: errorMsg, ip: req.ip });
      res.status(400).json({
        success: false,
        error: errorMsg
      });
      return;
    }

    const { email, password } = req.body;

    // Find user
    const result = await query(
      'SELECT id, email, password_hash, first_name, last_name, role, base_id FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      logger.warn('Login attempt failed for non-existent user', { email, ip: req.ip });
      res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
      return;
    }

    const user = result.rows[0];

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      logger.warn('Invalid password attempt', { email: user.email, user_id: user.id, ip: req.ip });
      res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { user_id: user.id },
      process.env['JWT_SECRET']!
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { user_id: user.id },
      process.env['JWT_SECRET']!
    );

    // Log user login
    logger.info({
      action: 'USER_LOGIN',
      user_id: user.id,
      email: user.email
    });

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          base_id: user.base_id
        },
        token,
        refreshToken
      }
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   GET /api/auth/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', authenticate, async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await query(
      'SELECT id, email, first_name, last_name, role, base_id, created_at FROM users WHERE id = $1',
      [req.user!.user_id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        error: 'User not found'
      });
      return;
    }

    const user = result.rows[0];

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    logger.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   POST /api/auth/refresh
// @desc    Refresh access token
// @access  Public
router.post('/refresh', [
  body('refreshToken').notEmpty()
], async (req: Request, res: Response): Promise<void> => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        error: errors.array()[0]?.msg || 'Validation error'
      });
      return;
    }

    const { refreshToken } = req.body;

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env['JWT_SECRET']!) as { user_id: string };

    // Check if user exists
    const result = await query(
      'SELECT id, email, first_name, last_name, role, base_id FROM users WHERE id = $1',
      [decoded.user_id]
    );

    if (result.rows.length === 0) {
      res.status(401).json({
        success: false,
        error: 'Invalid refresh token'
      });
      return;
    }

    const user = result.rows[0];

    // Generate new access token
    const newToken = jwt.sign(
      { user_id: user.id },
      process.env['JWT_SECRET']!
    );

    res.json({
      success: true,
      data: {
        token: newToken,
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          base_id: user.base_id
        }
      }
    });
  } catch (error) {
    logger.error('Token refresh error:', error);
    res.status(401).json({
      success: false,
      error: 'Invalid refresh token'
    });
  }
});

export default router; 