import dotenv from 'dotenv';

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000', 10),
  // Add other configuration variables here
  // Example: database: process.env.DATABASE_URL,
  //          jwtSecret: process.env.JWT_SECRET,
} as const;

export type Config = typeof config;
