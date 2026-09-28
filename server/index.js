import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool, checkConnection, initDatabase } from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize DB schema on launch
initDatabase();

// 1. Health & Database connection status endpoint
app.get('/api/status', async (req, res) => {
  const dbStatus = await checkConnection();
  res.json({
    app: 'Antigravity Weather API',
    status: 'online',
    database: dbStatus,
  });
});

// 2. Get pinned locations
app.get('/api/pins', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM pinned_locations ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Pin a new location
app.post('/api/pins', async (req, res) => {
  const { name, sector, condition, temp } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  try {
    const { rows } = await pool.query(
      `INSERT INTO pinned_locations (name, sector, condition, temp)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (name) DO UPDATE 
       SET condition = EXCLUDED.condition, temp = EXCLUDED.temp
       RETURNING *;`,
      [name, sector || 'SECTOR 01', condition || 'CLEAR VOID', temp || 20]
    );
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Delete a pinned location
app.delete('/api/pins/:name', async (req, res) => {
  const { name } = req.params;
  try {
    await pool.query('DELETE FROM pinned_locations WHERE name = $1', [name]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Search history
app.get('/api/history', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM search_history ORDER BY searched_at DESC LIMIT 10');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/history', async (req, res) => {
  const { city } = req.body;
  if (!city) return res.status(400).json({ error: 'City is required' });

  try {
    await pool.query('INSERT INTO search_history (city) VALUES ($1)', [city]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`[Antigravity Backend] Running on http://localhost:${PORT}`);
});
