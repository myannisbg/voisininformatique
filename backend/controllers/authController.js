import Compte from '../models/compte.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Inscription d'un utilisateur
export const registerUser = async (req, res) => {
  const { nom, prenom, mail, telephone, mot_de_passe, role } = req.body;
  try {
    const existingUser = await Compte.findOne({ where: { mail } });
    if (existingUser) {
      return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà.' });
    }

    const sel = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(mot_de_passe, sel);

    const utilisateur = await Compte.create({
      nom,
      prenom,
      mail,
      telephone,
      role,
      mot_de_passe: hashedPassword,
      sel,
    });
    // Générer un token JWT
    const token = jwt.sign(
      { id: utilisateur.ID_Utilisateur, role: utilisateur.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    res.status(201).json({ message: 'Utilisateur créé avec succès', utilisateur , token});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de l utilisateur' });
  }
};

// Connexion
export const loginUser = async (req, res) => {
  const { mail, mot_de_passe } = req.body;
  try {
    const utilisateur = await Compte.findOne({ where: { mail } });
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    const isValidPassword = await bcrypt.compare(mot_de_passe, utilisateur.mot_de_passe);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    const token = jwt.sign(
      { id: utilisateur.ID_Utilisateur, role: utilisateur.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(200).json({
      message: 'Connexion réussie',
      utilisateur: {
        id: utilisateur.ID_Utilisateur,
        nom: utilisateur.nom,
        prenom: utilisateur.prenom,
        role: utilisateur.role,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
};


export const tokenVerif = async (req, res) => {
  try {
      // Récupérer le token depuis les headers de la requête
      const token = req.headers.authorization?.split(" ")[1];

      // Vérifier si un token est fourni
      if (!token) {
          return res.status(401).json({ message: "Accès refusé, aucun token fourni." });
      }

      // Vérifier le token avec la clé secrète
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
              return res.status(403).json({ message: "Token invalide ou expiré." });
          }

          // Si le token est valide, renvoyer une réponse positive
          res.status(200).json({ message: "Token valide", user: decoded });
      });
  } catch (error) {
      res.status(500).json({ message: "Erreur serveur lors de la vérification du token." });
  }
};