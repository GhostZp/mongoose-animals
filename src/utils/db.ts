import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoConnect = async () => {
  // Connect to MongoDB
  await mongoose.connect(process.env.DB_URL!);

  console.log('Connected to MongoDB');
  console.log('Database:', mongoose.connection.name);
};

export default mongoConnect;
