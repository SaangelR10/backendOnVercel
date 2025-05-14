import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Function for connecting to MongoDB
const connectMongoDB = async () => {
  // URL hardcodeada (reemplaza con tu URL real)
  const mongoUri = 'mongodb+srv://mamilo:12345@tesis.dh0bt.mongodb.net/?retryWrites=true&w=majority&appName=Tesis';

  // Log para verificar la URL
  console.log('DATABASE_MONGO:', mongoUri);

  // Connect to MongoDB
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB conectado');
  } catch (error) {
    // If there is an error
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectMongoDB;