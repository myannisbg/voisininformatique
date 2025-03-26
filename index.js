import express from 'express'; 
import dotenv from 'dotenv';  
import connection from './backend/db/connection.js';
import sequelize from './backend/db/connection.js';
// import swaggerUi from 'swagger-ui-express'; 
// import swaggerJsDoc from 'swagger-jsdoc'; 
import path from 'path'; 
import { fileURLToPath } from 'url'; 
import authRoutes from './backend/routes/authRoutes.js';
import annonceRoutes from './backend/routes/annonceRoutes.js';
import adminRoutes from './backend/routes/adminRoutes.js';
import userRoutes from './backend/routes/userRoutes.js';
// import { protect } from './middleware/authMiddleware.js';
import Compte from './backend/models/compte.js';
import Annonce from './backend/models/annonce.js';
import Statut from './backend/models/statut.js';



const app = express();
app.use(express.json());

// Charger les variables d'environnement / Connexion à la base de données
// dotenv.config();
// connection();
(async () => {
    try {
      await sequelize.authenticate();
      console.log('Connexion à la base de données réussie.');
    } catch (error) {
      console.error('Erreur de connexion à la base de données :', error.message);
    }
  })();

// Endpoint pour récupérer des utilisateurs
app.get('/users', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur du serveur');
    }
});

// Endpoint pour ajouter un utilisateur
app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur du serveur');
    }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {console.log(`API démarrée sur http://localhost:${PORT}`);});


// Permet de résoudre __dirname dans les modules ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes principales
app.use('/api/auth', authRoutes);
app.use('/api/annonces', annonceRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {res.sendFile(path.join(__dirname, './frontend/index.html'));});
app.get('/index', (req, res) => {res.sendFile(path.join(__dirname, './frontend/index.html'));});
app.get('/profile', (req, res) => {res.sendFile(path.join(__dirname, './frontend/profile.html'));});
app.get('/inscription', (req, res) => {res.sendFile(path.join(__dirname, './frontend/inscription.html'));});
app.get('/annonces', (req, res) => {res.sendFile(path.join(__dirname, './frontend/annonces.html'));});
// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'frontend')));



const createTables = async () => {
    try {
      await sequelize.authenticate();
      console.log('Connexion à la base de données réussie.');

      // Synchroniser les modèles (crée les tables si elles n'existent pas déjà)
      await sequelize.sync({ alter: true }); // Utilisez `force: true` pour recréer les tables à chaque exécution
      console.log('Les tables ont été synchronisées avec succès.');
    } catch (error) {
      console.error('Impossible de se connecter à la base de données :', error);
    } finally {
      await sequelize.close();
    } 
  };

// initialise la base de donnée la 1er fois
// createTables();

export default app;