import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }, // RDS requires SSL
});

pool.connect()
  .then(() => console.log("✅ Connected to AWS RDS PostgreSQL"))
  .catch(err => console.error("❌ Database connection failed:", err));
