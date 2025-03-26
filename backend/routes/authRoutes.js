import express from 'express';
import { registerUser, loginUser,tokenVerif} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify',tokenVerif);

export default router;
