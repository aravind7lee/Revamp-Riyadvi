import mongoose from 'mongoose';
import dns from 'dns';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure .env is loaded from backend root directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Configure DNS to use reliable public resolvers for MongoDB Atlas SRV lookups on Windows
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  // fallback if system restricts custom DNS servers
}

export const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/riyadvi_db';
    const conn = await mongoose.connect(connStr);
    console.log(`[MongoDB Connected]: Successfully connected to host: ${conn.connection.host} (Database: ${conn.connection.name})`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB Error]: ${error.message}`);
    console.warn(`[MongoDB Warning]: Backend running in fallback mode.`);
  }
};

