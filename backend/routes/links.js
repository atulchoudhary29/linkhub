import express from 'express';
import linksController from '../controllers/linksController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, linksController.createLink);
router.get('/', auth, linksController.getUserLinks);
router.put('/:id', auth, linksController.updateLink);
router.delete('/:id', auth, linksController.deleteLink);

export default router;
