import { Router, Request, Response } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { logger } from '../utils/logger';
import prisma from '../lib/prisma';

const router = Router();

// @route   GET /api/personnel
// @desc    Get all personnel
// @access  Private
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const { base_id, rank, page = 1, limit = 10 } = req.query;
    
    // Build where conditions for Prisma
    const where: any = {};

    // Apply filters based on user role
    if (req.user!.role === 'base_commander' && req.user!.base_id) {
      where.base_id = req.user!.base_id;
    } else if (base_id && req.user!.role !== 'admin') {
      where.base_id = base_id as string;
    }

    if (rank) {
      where.rank = rank as string;
    }

    // Get total count
    const total = await prisma.personnel.count({ where });

    // Get paginated results with base information
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    const personnel = await prisma.personnel.findMany({
      where,
      include: {
        bases: {
          select: {
            name: true
          }
        }
      },
      orderBy: [
        { first_name: 'asc' },
        { last_name: 'asc' }
      ],
      take: parseInt(limit as string),
      skip: offset
    });

    // Transform data to match expected format
    const transformedPersonnel = personnel.map(person => ({
      ...person,
      base_name: person.bases.name,
      full_name: `${person.first_name} ${person.last_name}`
    }));

    res.json({
      success: true,
      data: transformedPersonnel,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(total / parseInt(limit as string))
      }
    });
  } catch (error) {
    logger.error('Get personnel error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   GET /api/personnel/:id
// @desc    Get personnel by ID
// @access  Private
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Personnel ID is required'
      });
    }

    const personnel = await prisma.personnel.findUnique({
      where: { id },
      include: {
        bases: {
          select: {
            name: true
          }
        }
      }
    });

    if (!personnel) {
      return res.status(404).json({
        success: false,
        error: 'Personnel not found'
      });
    }

    // Check access permissions
    if (req.user!.role === 'base_commander' && personnel.base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied to this personnel record'
      });
    }

    // Transform data to match expected format
    const transformedPersonnel = {
      ...personnel,
      base_name: personnel.bases.name,
      full_name: `${personnel.first_name} ${personnel.last_name}`
    };

    return res.json({
      success: true,
      data: transformedPersonnel
    });
  } catch (error) {
    logger.error('Get personnel error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   POST /api/personnel
// @desc    Create new personnel
// @access  Private (Admin, Base Commander)
router.post('/', authenticate, authorize('admin', 'base_commander'), async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, rank, base_id, email, phone, department } = req.body;

    // Validate required fields
    if (!first_name || !last_name || !rank || !base_id) {
      return res.status(400).json({
        success: false,
        error: 'First name, last name, rank, and base are required'
      });
    }

    // Base commanders can only create personnel for their base
    const targetBaseId = req.user!.role === 'base_commander' ? req.user!.base_id : base_id;

    const newPersonnel = await prisma.personnel.create({
      data: {
        first_name,
        last_name,
        rank,
        base_id: targetBaseId,
        email: email || null,
        phone: phone || null,
        department: department || null
      }
    });

    // Log personnel creation
    logger.info({
      action: 'PERSONNEL_CREATED',
      user_id: req.user!.user_id,
      personnel_id: newPersonnel.id,
      personnel_name: `${newPersonnel.first_name} ${newPersonnel.last_name}`
    });

    return res.status(201).json({
      success: true,
      data: newPersonnel
    });
  } catch (error) {
    logger.error('Create personnel error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   PUT /api/personnel/:id
// @desc    Update personnel
// @access  Private (Admin, Base Commander)
router.put('/:id', authenticate, authorize('admin', 'base_commander'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, rank, base_id, email, phone, department } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Personnel ID is required'
      });
    }

    // Check if personnel exists
    const existingPersonnel = await prisma.personnel.findUnique({
      where: { id }
    });

    if (!existingPersonnel) {
      return res.status(404).json({
        success: false,
        error: 'Personnel not found'
      });
    }

    // Check access permissions
    if (req.user!.role === 'base_commander' && existingPersonnel.base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied to this personnel record'
      });
    }

    // Base commanders can only update personnel in their base
    const targetBaseId = req.user!.role === 'base_commander' ? req.user!.base_id : base_id;

    // Build update data
    const updateData: any = {};
    if (first_name !== undefined) updateData.first_name = first_name;
    if (last_name !== undefined) updateData.last_name = last_name;
    if (rank !== undefined) updateData.rank = rank;
    if (targetBaseId !== undefined) updateData.base_id = targetBaseId;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (department !== undefined) updateData.department = department;

    const updatedPersonnel = await prisma.personnel.update({
      where: { id },
      data: updateData
    });

    // Log personnel update
    logger.info({
      action: 'PERSONNEL_UPDATED',
      user_id: req.user!.user_id,
      personnel_id: id,
      changes: req.body
    });

    return res.json({
      success: true,
      data: updatedPersonnel
    });
  } catch (error) {
    logger.error('Update personnel error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   DELETE /api/personnel/:id
// @desc    Delete personnel
// @access  Private (Admin, Base Commander)
router.delete('/:id', authenticate, authorize('admin', 'base_commander'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Personnel ID is required'
      });
    }

    // Check if personnel exists
    const existingPersonnel = await prisma.personnel.findUnique({
      where: { id }
    });

    if (!existingPersonnel) {
      return res.status(404).json({
        success: false,
        error: 'Personnel not found'
      });
    }

    // Check access permissions
    if (req.user!.role === 'base_commander' && existingPersonnel.base_id !== req.user!.base_id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied to this personnel record'
      });
    }

    // Check if personnel has active assignments
    const assignmentCount = await prisma.assignments.count({
      where: {
        assigned_to: id,
        status: 'active'
      }
    });

    if (assignmentCount > 0) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete personnel with active assignments'
      });
    }

    await prisma.personnel.delete({
      where: { id }
    });

    // Log personnel deletion
    logger.info({
      action: 'PERSONNEL_DELETED',
      user_id: req.user!.user_id,
      personnel_id: id,
      personnel_name: `${existingPersonnel.first_name} ${existingPersonnel.last_name}`
    });

    return res.json({
      success: true,
      message: 'Personnel deleted successfully'
    });
  } catch (error) {
    logger.error('Delete personnel error:', error);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

export default router;