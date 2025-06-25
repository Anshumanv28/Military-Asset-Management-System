import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import { logger } from '../utils/logger';
import prisma from '../lib/prisma';

const router = Router();

// @route   GET /api/users
// @desc    Get users with optional role filtering
// @access  Private
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { role, limit = '1000' } = req.query;
    
    // Build where conditions for Prisma
    const where: any = {
      is_active: true
    };

    // Add role filter
    if (role && role !== '') {
      where.role = role as string;
    }

    const users = await prisma.users.findMany({
      where,
      select: {
        id: true,
        username: true,
        first_name: true,
        last_name: true,
        role: true,
        base_id: true
      },
      orderBy: [
        { first_name: 'asc' },
        { last_name: 'asc' }
      ],
      take: parseInt(limit as string)
    });

    return res.json({
      success: true,
      data: users
    });
  } catch (error) {
    logger.error('Get users error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

export default router; 