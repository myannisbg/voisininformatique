import Annonce from '../models/annonce.js';
import AnnonceSchema from '../models/annonce.js';

// Récupérer toutes les annonces
export const getAnnonces = async (req, res) => {
  try {
    const annonces = await Annonce.findAll();
    res.status(200).json(annonces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des annonces.' });
  }
};

// Créer une annonce
export const createAnnonce = async (req, res) => {
  const { id_utilisateur, titre_annonce, description } = req.body;
  try {
    const annonce = await Annonce.create({
      id_utilisateur,
      titre_annonce,
      description,
    });

    res.status(201).json({ message: 'Annonce créée avec succès', annonce });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de l’annonce.' });
  }
};

// Mettre à jour une annonce
export const updateAnnonce = async (req, res) => {
  const { id } = req.params;  // ID de l'annonce à mettre à jour
  const { id_utilisateur, titre_annonce, description } = req.body;  // Données à mettre à jour

  try {
    // Trouver l'annonce par son ID
    const annonce = await Annonce.findByPk(id);

    // Si l'annonce n'existe pas
    if (!annonce) {
      return res.status(404).json({ message: 'Annonce introuvable.' });
    }

    // Mettre à jour les informations de l'annonce
    annonce.id_utilisateur = id_utilisateur || annonce.id_utilisateur;  // Conserve la valeur existante si non fourni
    annonce.titre_annonce = titre_annonce || annonce.titre_annonce;
    annonce.description = description || annonce.description;

    // Sauvegarder les modifications dans la base de données
    await annonce.save();

    res.status(200).json({ message: 'Annonce mise à jour avec succès.', annonce });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l’annonce.' });
  }
};

// Supprimer une annonce
export const deleteAnnonce = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Annonce.destroy({ where: { id_annonce: id } });
    if (!result) {
      return res.status(404).json({ message: 'Annonce introuvable.' });
    }

    res.status(200).json({ message: 'Annonce supprimée avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l’annonce.' });
  }
};
