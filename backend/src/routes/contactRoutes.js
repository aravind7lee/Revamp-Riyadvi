import express from 'express';
import { Contact } from '../models/Contact.js';
import { sendContactNotification } from '../services/emailService.js';

const router = express.Router();

// POST /api/contacts - Submit contact form or consultation booking
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, service, budget, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }

    let contact = null;
    try {
      contact = await Contact.create({ name, email, phone, service, budget, message });
    } catch (err) {
      console.log('DB save fallback: Contact logged to memory/console');
      contact = { _id: Date.now().toString(), name, email, phone, service, budget, message };
    }

    // Dispatch email alert via Resend API
    sendContactNotification({ name, email, phone, service, budget, message }).catch(err => {
      console.error('[Contact Email Dispatch Error]:', err);
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry received. Our solution desk will contact you within 2 hours.',
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/contacts - List inquiries
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
