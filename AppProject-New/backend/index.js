const express = require('express');
const app = express();
const port = 3000;

app.get('/api/test', (req, res) => {
  res.json({ message: 'API working' });
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
