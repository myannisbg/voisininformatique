// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';

// dotenv.config();
// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: 'mysql', // ou 'sqlite', 'postgres', etc.
// });

// // Tester la connexion à la base de données avec Sequelize
// // (async () => {
// //   try {
// //     await sequelize.authenticate();
// //     console.log('Connexion à la base de données réussie avec Sequelize !');
// //   } catch (err) {
// //     console.error('Erreur de connexion à la base de données avec Sequelize :', err.message);
// //   }
// // })();

// export default sequelize;





import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;