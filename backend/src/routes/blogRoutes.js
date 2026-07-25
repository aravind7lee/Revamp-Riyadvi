import express from 'express';
import { Blog } from '../models/Blog.js';

const router = express.Router();

// GET /api/blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
