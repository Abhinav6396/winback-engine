import { Router } from 'express';
import { memberRouter } from './member.routes';

export const apiRouter = Router();

// API routes
apiRouter.use('/members', memberRouter);

// 404 handler for /api/*
apiRouter.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found',
  });
});
