const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// 전체 게시글 조회
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM posts ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 게시글 작성
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const [result] = await db.query(
      'INSERT INTO posts (title, content) VALUES (?, ?)',
      [title, content]
    );
    res.status(201).json({});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
