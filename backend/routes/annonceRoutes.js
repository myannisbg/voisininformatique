import express from 'express';
import { protect,isAdmin,isTechnician,isClient } from '../middleware/authMiddleware.js';
import {createAnnonce,getAnnonces,updateAnnonce,deleteAnnonce} from '../controllers/annonceController.js';
import multer from "multer";

const router = express.Router();


// Configuration du stockage des images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "image-annonces/"); // Dossier où les images seront stockées
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Nom unique pour éviter les conflits
  },
});

const upload = multer({ storage });



router.post("/create", upload.single("image"), createAnnonce);
router.get('/', getAnnonces);
router.post('/', protect, createAnnonce);
router.put('/:id', protect, updateAnnonce);
router.delete('/:id', protect, deleteAnnonce);

export default router;
