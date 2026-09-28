import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Parse or construct pool config
const connectionString = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
});

let isInitialized = false;

export async function checkConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as now, current_database() as db;');
    client.release();
    return { connected: true, timestamp: result.rows[0].now, database: result.rows[0].db };
  } catch (error) {
    return { connected: false, error: error.message };
  }
}

export async function initDatabase() {
  if (isInitialized) return;
  try {
    const client = await pool.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS pinned_locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        sector VARCHAR(100),
        condition VARCHAR(100),
        temp INT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS search_history (
        id SERIAL PRIMARY KEY,
        city VARCHAR(100) NOT NULL,
        searched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    client.release();
    isInitialized = true;
    console.log('[Supabase] Database tables initialized successfully.');
  } catch (error) {
    console.warn('[Supabase] Table initialization pending active credentials:', error.message);
  }
}
