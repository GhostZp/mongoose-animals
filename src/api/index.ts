import express, { Request, Response } from 'express';

import { MessageResponse } from '../types/Messages';

import categoryRouter from '../routers/categoryRouter';
import speciesRouter from '../routers/speciesRouter';
import animalRouter from '../routers/animalRouter';

const router = express.Router();

router.get<{}, MessageResponse>('/', (_req: Request, res: Response) => {
  res.json({
    message: 'api v1',
  });
});

router.use('/categories', categoryRouter);
router.use('/species', speciesRouter);
router.use('/animals', animalRouter);

export default router;