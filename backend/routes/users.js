import express from 'express';
import usersController from '../controllers/usersController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);
router.get('/me', auth, usersController.getMe);
router.get('/:username', usersController.getUserByUsername);

export default router;
