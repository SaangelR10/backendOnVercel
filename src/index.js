import express from 'express';
import cors from 'cors';
import connectMongoDB from './databases/mongoDatabase.js';
import { connectPostgreSQL, sequelize } from './databases/postgresqlDatabase.js';
import authRoutes from './routes/authRoutes.js';
import dataRoutes from './routes/sensorRoutes.js';
import dotenv from 'dotenv';
import SensorData from './models/sensorData.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: [
    'https://front-on-vercel.vercel.app',
    'https://front-on-vercel-sergios-projects-04bff688.vercel.app', // Secondary frontend domain
    'http://localhost:3000' // Dominio del frontend
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // Si usas cookies o autenticación basada en sesiones
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} from ${req.headers.origin}`);
  next();
});

app.use(express.json());
// Conectar a MongoDB
connectMongoDB();

// Conectar a PostgreSQL y sincronizar el modelo
connectPostgreSQL();
sequelize.options.logging = console.log; // Habilitar logs de Sequelize
SensorData.sync({ alter: false }); // Sincronizar sin alterar la tabla


// Endpoint for root route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/sensor', dataRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));