import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Connect to PostgreSQL database from .env
const sequelize = new Sequelize('postgres://usuario:contraseña@host:5432/nombre_base_datos', {
  dialect: 'postgres',
  logging: false,
});

// Function for connecting to PostgreSQL
const connectPostgreSQL = async () => {
  try {
    // Connect to PostgreSQL
    await sequelize.authenticate();
    console.log('PostgreSQL connected');
  } catch (error) {
    // If there is an error
    console.error('PostgreSQL connection error:', error);
    process.exit(1);
  }
};

export { connectPostgreSQL, sequelize };
