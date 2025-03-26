import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

const Compte = sequelize.define('Compte', {
  ID_Utilisateur: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  mail: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'utilisateur', // 'utilisateur' ou 'depanneur' ou 'admin'
  },
  mot_de_passe: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'compte',
});

export default Compte;
