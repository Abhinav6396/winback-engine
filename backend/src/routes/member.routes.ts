import { Router } from 'express';
import { getMembers, getMemberById, updateMember } from '../controllers/member.controller';

const router = Router();

// GET /api/members - Get all members
router.get('/', getMembers);

// GET /api/members/:id - Get member by ID
router.get('/:id', getMemberById);

// PUT /api/members/:id - Update member
router.put('/:id', updateMember);

export { router as memberRouter };
