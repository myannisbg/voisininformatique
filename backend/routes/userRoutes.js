import express from 'express';
import {
  getSelfProfil,
  getProfilById,
  updateSelfProfil,
  deleteSelfProfil,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route pour récupérer le profil de l'utilisateur connecté
router.get('/me', protect, getSelfProfil);

// Route pour récupérer le profil d'un utilisateur par ID (accessible uniquement par admin)
router.get('/:id', protect, getProfilById);

// Route pour mettre à jour le profil de l'utilisateur connecté
router.put('/me', protect, updateSelfProfil);

// Route pour supprimer le compte de l'utilisateur connecté
router.delete('/me', protect, deleteSelfProfil);

export default router;
