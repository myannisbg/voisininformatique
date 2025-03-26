// import mysql from 'mysql2/promise';
// import dotenv from 'dotenv'; 

// // Tester la connexion à la base de données
// const connection = async () => {
//     let pool;
//     try {
//         // Créer un pool de connexions MySQL
//         pool = mysql.createPool({
//             host: process.env.DB_HOST,
//             user: process.env.DB_USER,
//             password: process.env.DB_PASSWORD,
//             database: process.env.DB_NAME,
//             waitForConnections: true,
//             connectionLimit: 10,
//             queueLimit: 0,
//         });
//     }
//     catch (err) {
//         console.error("Erreur de connexion à la base de données :", err.message);
//     }
//     try {
//         const connection = await pool.getConnection();
//         console.log("Connexion à la base de données réussie !");
//         connection.release(); // Libère la connexion
//     } catch (err) {
//         console.error("Erreur de connexion à la base de données :", err.message);
//     }
// };

// export default connection;



import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql', // ou 'sqlite', 'postgres', etc.
});

// Tester la connexion à la base de données avec Sequelize
// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connexion à la base de données réussie avec Sequelize !');
//   } catch (err) {
//     console.error('Erreur de connexion à la base de données avec Sequelize :', err.message);
//   }
// })();

export default sequelize;
