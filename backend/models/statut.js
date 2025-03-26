import { DataTypes } from 'sequelize';
import sequelize from '../db/connection.js';

const Statut = sequelize.define('Statut', {
  id_commande: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  statut: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
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
  tableName: 'statut',
});

export default Statut;
