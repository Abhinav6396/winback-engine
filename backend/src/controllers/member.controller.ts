import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../middleware/errorHandler';

// Mock data - replace with actual database calls
const members = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'at_risk' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'critical' },
];

// Get all members
export const getMembers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // In a real app, you would fetch from a database
    res.status(200).json({
      status: 'success',
      results: members.length,
      data: {
        members,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get member by ID
export const getMemberById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const member = members.find((m) => m.id === parseInt(req.params.id));
    
    if (!member) {
      return next(new ApiError(404, 'Member not found'));
    }

    res.status(200).json({
      status: 'success',
      data: {
        member,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update member
export const updateMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const member = members.find((m) => m.id === parseInt(req.params.id));
    
    if (!member) {
      return next(new ApiError(404, 'Member not found'));
    }

    // In a real app, you would update the database
    const updatedMember = { ...member, ...req.body };

    res.status(200).json({
      status: 'success',
      data: {
        member: updatedMember,
      },
    });
  } catch (error) {
    next(error);
  }
};
