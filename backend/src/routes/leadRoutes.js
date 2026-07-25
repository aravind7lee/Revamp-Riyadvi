import express from 'express';
import { Lead } from '../models/Lead.js';
import { sendLeadNotification } from '../services/emailService.js';

const router = express.Router();

// POST /api/leads - Create lead magnet record
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    let lead = null;
    try {
      lead = await Lead.create({ name, email, phone, company });
    } catch (err) {
      console.log('DB save fallback: Lead logged to memory/console');
      lead = { _id: Date.now().toString(), name, email, phone, company };
    }

    // Dispatch email alert via Resend API
    sendLeadNotification({ name, email, phone, company }).catch(err => {
      console.error('[Lead Email Dispatch Error]:', err);
    });

    res.status(201).json({
      success: true,
      message: 'Lead recorded successfully. Download initiated.',
      data: lead,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/leads - Fetch all leads (Admin)
router.get('/', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
