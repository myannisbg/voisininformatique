import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';
import Compte from './compte.js';
import mongoose from "mongoose";


const Annonce = sequelize.define('Annonce', {
  id_annonce: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  id_utilisateur: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: Compte,
      key: 'ID_Utilisateur',
    },
  },
  id_depanneur: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: Compte,
      key: 'ID_Utilisateur',
    },
  },
  titre_annonce: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  statut: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'en_attente', // 'en_attente', 'en_cours', 'terminé'
  },
  prix_devis: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  date_creation: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  statut_commentaire: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: false,
  tableName: 'annonces',
});
const AnnonceSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    description: { type: String, required: true },
    prix: { type: Number, required: true },
    categorie: { type: String, required: true },
    image: { type: String }, // Stocke uniquement le lien de l'image
});


export default { Annonce, AnnonceSchema };