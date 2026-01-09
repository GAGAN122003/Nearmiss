const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_PATH = path.join(__dirname, 'data', 'db.dashboard_incidents.json');
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// Simple GET to serve the dataset
app.get('/api/data', (req, res) => {
  fs.readFile(DATA_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading dataset:', err);
      return res.status(500).json({ error: 'Dataset not found on server.' });
    }
    try {
      const json = JSON.parse(data);
      return res.json({ records: Array.isArray(json) ? json : json.records || [] });
    } catch (e) {
      console.error('Invalid JSON in dataset', e);
      return res.status(500).json({ error: 'Invalid JSON in dataset.' });
    }
  });
});

// Upload endpoint to replace dataset (optional)
const upload = multer({ dest: UPLOAD_DIR });
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });
  const tmp = req.file.path;
  fs.readFile(tmp, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Error reading uploaded file.' });
    try {
      JSON.parse(data); // validate
      fs.copyFile(tmp, DATA_PATH, (cpErr) => {
        if (cpErr) return res.status(500).json({ error: 'Failed to save dataset.' });
        return res.json({ ok: true });
      });
    } catch (e) {
      return res.status(400).json({ error: 'Uploaded file is not valid JSON.' });
    }
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));