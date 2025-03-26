import pool from '../db/connection.js';

// Récupérer tous les utilisateurs
export const getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, name, email, role FROM users');
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
  }
};

// Supprimer un utilisateur
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l’utilisateur.' });
  }
};

// Récupérer toutes les annonces
export const getAllAnnonces = async (req, res) => {
  try {
    const [annonces] = await pool.query('SELECT * FROM annonces');
    res.status(200).json(annonces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des annonces.' });
  }
};

// Supprimer une annonce
export const deleteAnnonce = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM annonces WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Annonce non trouvée.' });
    }
    res.status(200).json({ message: 'Annonce supprimée avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l’annonce.' });
  }
};
