import express from 'express';
import { ListHandler } from '../handlers/ListHandlers';

const router = express.Router();
const listHandler = new ListHandler();

router.get('/', (req, res) => listHandler.getList(req, res));
router.post('/add-to-list', (req, res) => listHandler.addToList(req, res));
router.delete('/:id', (req, res) => listHandler.deleteFromList(req, res));

export default router;
