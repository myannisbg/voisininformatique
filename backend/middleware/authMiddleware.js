import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Compte from '../models/compte.js';

// Middleware pour protéger les routes
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Récupérer le token
      token = req.headers.authorization.split(' ')[1];
      // console.log('Token reçu:', token);

      // Décrypter le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Récupérer l'utilisateur en excluant 'mot_de_passe' et 'sel'
      req.user = await Compte.findByPk(decoded.id, {
        attributes: { exclude: ['mot_de_passe','sel'] },
      });
      console.log('Utilisateur récupéré:', req.user);

      if (!req.user) {
        console.error('Utilisateur introuvable dans la base de données');
        res.status(401);
        throw new Error('Utilisateur introuvable');
      }
      next();
    } catch (error) {
      console.error('Erreur dans le middleware protect:', error);
      res.status(401);
      throw new Error('Non autorisé, échec du token');
    }
  }

  if (!token) {
    console.error('Aucun token fourni dans la requête');
    res.status(401);
    throw new Error('Non autorisé, aucun token');
  }
});


// Middleware pour vérifier si l'utilisateur est administrateur
export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Accès interdit : rôle admin requis.' });
  }
  next();
};

// Middleware pour vérifier si l'utilisateur est technicien
export const isTechnician = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'depanneur')) {
    next();
  } else {
    res.status(403);
    throw new Error('Non autorisé en tant que technicien');
  }
};

// Middleware pour vérifier si l'utilisateur est client
export const isClient = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'client')) {
    next();
  } else {
    res.status(403);
    throw new Error('Non autorisé en tant que client');
  }
};
