import express from 'express';
import { Portfolio } from '../models/Portfolio.js';

const router = express.Router();

// GET /api/portfolio
router.get('/', async (req, res) => {
  try {
    const portfolio = await Portfolio.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: portfolio });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
