import Compte from '../models/compte.js';
import bcrypt from 'bcryptjs';

// Récupérer les informations du profil de l'utilisateur connecté
export const getSelfProfil = async (req, res) => {
  try {
    const utilisateur = await Compte.findByPk(req.user.ID_Utilisateur, {
      attributes: ['ID_Utilisateur', 'nom', 'prenom', 'mail', 'telephone', 'role'],
    });
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    res.status(200).json(utilisateur);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération du profil' });
  }
};

// Récupérer les informations d'un utilisateur par ID (admin uniquement)
export const getProfilById = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    const utilisateur = await Compte.findByPk(req.params.ID_Utilisateur, {
      attributes: ['ID_Utilisateur', 'nom', 'prenom', 'mail', 'telephone', 'role'],
    });
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    res.status(200).json(utilisateur);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération du profil' });
  }
};

// Mettre à jour les informations du profil de l'utilisateur connecté
export const updateSelfProfil = async (req, res) => {
  try {
    const { nom, prenom, mail, telephone, mot_de_passe } = req.body;

    const utilisateur = await Compte.findByPk(req.user.ID_Utilisateur);
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    if (mail && mail !== utilisateur.mail) {
      const emailExiste = await Compte.findOne({ where: { mail } });
      if (emailExiste) {
        return res.status(400).json({ message: 'Cet e-mail est déjà utilisé' });
      }
      utilisateur.mail = mail; // Met à jour seulement si l'e-mail est valide
    }

    if (nom) utilisateur.nom = nom;
    if (prenom) utilisateur.prenom = prenom;
    if (telephone) utilisateur.telephone = telephone;

    if (mot_de_passe) {
      const sel = await bcrypt.genSalt(10);
      utilisateur.mot_de_passe = await bcrypt.hash(mot_de_passe, sel);
    }

    await utilisateur.save();

    res.status(200).json({ message: 'Profil mis à jour avec succès', utilisateur });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du profil' });
  }
};

// Supprimer le compte de l'utilisateur connecté
export const deleteSelfProfil = async (req, res) => {
  try {
    const utilisateur = await Compte.findByPk(req.user.ID_Utilisateur);
    if (!utilisateur) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    await utilisateur.destroy();

    res.status(200).json({ message: 'Compte supprimé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression du compte' });
  }
};
