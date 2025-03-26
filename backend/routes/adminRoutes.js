import express from 'express';
import { protect,isAdmin,isTechnician,isClient } from '../middleware/authMiddleware.js';
import {
  getAllUsers,
  deleteUser,
  getAllAnnonces,
  deleteAnnonce,
} from '../controllers/adminController.js';

const router = express.Router();

// Middleware d'authentification pour s'assurer que l'utilisateur est admin
router.use(protect);

// Gestion des utilisateurs
router.get('/users', getAllUsers); // Liste tous les utilisateurs
router.delete('/users/:id', deleteUser); // Supprime un utilisateur

// Gestion des annonces
router.get('/annonces', getAllAnnonces); // Liste toutes les annonces
router.delete('/annonces/:id', deleteAnnonce); // Supprime une annonce

export default router;
