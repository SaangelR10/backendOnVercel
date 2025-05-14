import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

// Connect to PostgreSQL database from .env
const sequelize = new Sequelize('postgresql://postgres.bxhjfgboblhpodkggymx:sERGIOANGEL1*@aws-0-us-east-1.pooler.supabase.com:6543/postgres', {
  dialect: 'postgres',
  logging: false,
  dialectModule: pg
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
