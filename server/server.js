require('dotenv').config();
const express = require('express');
const cors = require('cors');
const postsRouter = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/posts', postsRouter);

app.get('/api', (req, res) => {
  res.json({ message: 'API is working' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
