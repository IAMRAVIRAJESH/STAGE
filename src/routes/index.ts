import express from 'express';
import listRoutes from './ListRoutes';

const router = express.Router();

router.use('/list', listRoutes);

export default router;
