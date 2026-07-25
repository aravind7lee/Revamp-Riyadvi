import express from 'express';
import { Newsletter } from '../models/Newsletter.js';
import { sendEmail } from '../services/emailService.js';

const router = express.Router();

/**
 * POST /api/newsletter
 * Subscribes an email address using Resend Email API & saves record in MongoDB.
 */
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'A valid email address is required.' });
    }

    let subscriber = null;
    try {
      subscriber = await Newsletter.findOneAndUpdate(
        { email: email.toLowerCase() },
        { email: email.toLowerCase(), status: 'Subscribed' },
        { upsert: true, new: true }
      );
    } catch (dbErr) {
      console.warn('[Newsletter DB Warning]: Could not save subscriber to DB, continuing with Resend:', dbErr.message);
      subscriber = { email, status: 'Subscribed' };
    }

    // 1. Send Admin Notification via Resend
    sendEmail({
      to: process.env.ADMIN_EMAIL || 'antigravity.aravvvv1@gmail.com',
      subject: `📰 New Newsletter Subscriber: ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #050508; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #D4AF37;">
          <h2 style="color: #D4AF37; margin-top: 0;">New Newsletter Subscriber</h2>
          <p style="color: #d1d5db; font-size: 14px;">A new subscriber has joined the Riyadvi Software Technologies newsletter:</p>
          <div style="padding: 12px 16px; background-color: #111116; border-radius: 8px; border-left: 4px solid #D4AF37; margin: 16px 0;">
            <strong style="color: #D4AF37;">Subscriber Email:</strong> <span style="color: #ffffff;">${email}</span>
          </div>
          <p style="font-size: 12px; color: #71717a; text-align: center; margin-top: 20px;">
            Riyadvi Software Technologies — Resend Automated Email Dispatcher
          </p>
        </div>
      `,
    }).catch(err => console.error('[Resend Newsletter Alert Error]:', err));

    // 2. Send Welcome Email to Subscriber via Resend
    sendEmail({
      to: email,
      subject: `Welcome to Riyadvi Software Technologies Insights`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #050508; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #D4AF37;">
          <h2 style="color: #D4AF37; margin-top: 0;">Welcome to Riyadvi Tech Insights</h2>
          <p style="color: #e4e4e7; font-size: 14px; line-height: 1.6;">
            Thank you for subscribing! You will now receive our latest engineering benchmarks, web development architecture guides, and enterprise software insights directly in your inbox.
          </p>
          <div style="margin-top: 20px; padding: 16px; background-color: #111116; border-radius: 8px;">
            <p style="margin: 0; color: #D4AF37; font-weight: bold; font-size: 13px;">What to expect:</p>
            <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #a1a1aa; font-size: 13px;">
              <li>React 19 & Node.js Microservices Benchmarks</li>
              <li>Software Architecture & Security RFP Checklists</li>
              <li>Case Studies & Spatial 3D / AR/VR Innovations</li>
            </ul>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #71717a; text-align: center;">
            Riyadvi Software Technologies © 2026 · <a href="https://riyadvisoftwaretechnologies.com" style="color: #D4AF37; text-decoration: none;">riyadvisoftwaretechnologies.com</a>
          </p>
        </div>
      `,
    }).catch(err => console.error('[Resend Welcome Email Error]:', err));

    res.status(200).json({
      success: true,
      message: `Thank you! ${email} has been subscribed to our newsletter via Resend.`,
      data: subscriber,
    });
  } catch (error) {
    console.error('[Newsletter Error]:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe to newsletter. Please try again.',
    });
  }
});

// GET /api/newsletter - Fetch subscriber list (Admin)
router.get('/', async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: subscribers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
