import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const resendApiKey = process.env.RESEND_API_KEY;
const resend = new Resend(resendApiKey);

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'antigravity.aravvvv1@gmail.com';
const FROM_EMAIL = 'onboarding@resend.dev';

/**
 * Core function to dispatch an email via Resend
 */
export async function sendEmail({ to = ADMIN_EMAIL, subject, html }) {
  try {
    const targetEmail = to || ADMIN_EMAIL;
    console.log(`[Resend Email]: Dispatching email to ${targetEmail} | Subject: "${subject}"...`);
    const response = await resend.emails.send({
      from: FROM_EMAIL,
      to: targetEmail,
      subject,
      html,
    });

    if (response?.error) {
      console.warn(`[Resend Email Warning]: API response error (${response.error.name}): ${response.error.message}`);
      // Fallback: If in Resend test mode and target is not verified, attempt dispatching to ADMIN_EMAIL
      if (response.error.message && response.error.message.includes('validation_error') && targetEmail !== ADMIN_EMAIL) {
        console.info(`[Resend Email]: Retrying dispatch to verified admin inbox (${ADMIN_EMAIL})...`);
        const fallbackRes = await resend.emails.send({
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          subject: `[Copy] ${subject}`,
          html,
        });
        return { success: true, data: fallbackRes?.data };
      }
      return { success: false, error: response.error.message };
    }

    console.log(`[Resend Email]: Successfully sent email! Resend ID: ${response?.data?.id || 'OK'}`);
    return { success: true, data: response?.data };
  } catch (error) {
    console.error('[Resend Email Error]: Exception thrown while sending email:', error.message || error);
    return { success: false, error: error.message };
  }
}

/**
 * Send notification when a client submits the Contact / Quote form
 */
export async function sendContactNotification(contactData) {
  const { name, email, phone, service, budget, message } = contactData;
  const subject = `📩 New Inquiry: ${name} requested ${service}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #050508; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #D4AF37;">
      <h2 style="color: #D4AF37; margin-top: 0;">Riyadvi Software Technologies — New Inquiry</h2>
      <p style="color: #d1d5db; font-size: 14px;">A new consultation request has been submitted on the website:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
        <tr style="border-bottom: 1px solid #27272a;">
          <td style="padding: 10px 0; font-weight: bold; color: #D4AF37;">Client Name:</td>
          <td style="padding: 10px 0; color: #ffffff;">${name}</td>
        </tr>
        <tr style="border-bottom: 1px solid #27272a;">
          <td style="padding: 10px 0; font-weight: bold; color: #D4AF37;">Email:</td>
          <td style="padding: 10px 0; color: #ffffff;"><a href="mailto:${email}" style="color: #D4AF37;">${email}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #27272a;">
          <td style="padding: 10px 0; font-weight: bold; color: #D4AF37;">Phone:</td>
          <td style="padding: 10px 0; color: #ffffff;">${phone || 'Not Provided'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #27272a;">
          <td style="padding: 10px 0; font-weight: bold; color: #D4AF37;">Requested Service:</td>
          <td style="padding: 10px 0; color: #ffffff; font-weight: bold;">${service}</td>
        </tr>
        <tr style="border-bottom: 1px solid #27272a;">
          <td style="padding: 10px 0; font-weight: bold; color: #D4AF37;">Budget:</td>
          <td style="padding: 10px 0; color: #ffffff;">${budget || 'Not Specified'}</td>
        </tr>
      </table>

      <div style="margin-top: 20px; padding: 16px; background-color: #111116; border-radius: 8px; border-left: 4px solid #D4AF37;">
        <h4 style="margin: 0 0 8px 0; color: #D4AF37;">Project Message / Description:</h4>
        <p style="margin: 0; color: #e4e4e7; white-space: pre-line;">${message}</p>
      </div>

      <p style="margin-top: 24px; font-size: 12px; color: #71717a; text-align: center;">
        Riyadvi Software Technologies © 2026 — Executive Notification System
      </p>
    </div>
  `;

  return await sendEmail({ to: ADMIN_EMAIL, subject, html });
}

/**
 * Send notification when a visitor downloads the Lead Magnet PDF
 */
export async function sendLeadNotification(leadData) {
  const { name, email, phone, company } = leadData;
  const subject = `🎯 New Lead Magnet Download: ${name}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #050508; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #D4AF37;">
      <h2 style="color: #D4AF37; margin-top: 0;">New Lead Magnet Downloaded</h2>
      <p style="color: #d1d5db; font-size: 14px;">A user downloaded the <strong>Software Project Planning Guide PDF</strong>:</p>
      
      <ul style="color: #e4e4e7; font-size: 14px; line-height: 1.8;">
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> <a href="mailto:${email}" style="color: #D4AF37;">${email}</a></li>
        <li><strong>Company:</strong> ${company || 'N/A'}</li>
        <li><strong>Phone:</strong> ${phone || 'N/A'}</li>
      </ul>

      <p style="margin-top: 20px; font-size: 12px; color: #71717a;">
        Riyadvi Automated Lead Dispatcher
      </p>
    </div>
  `;

  return await sendEmail({ to: ADMIN_EMAIL, subject, html });
}

/**
 * Send notification when a candidate applies for a career opening
 */
export async function sendCareerApplicationNotification(appData) {
  const { jobTitle, fullName, email, phone, experience, portfolioUrl, coverLetter } = appData;
  const subject = `💼 New Job Application: ${fullName} (${jobTitle})`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #050508; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #D4AF37;">
      <h2 style="color: #D4AF37; margin-top: 0;">New Candidate Application Received</h2>
      <p style="color: #d1d5db; font-size: 14px;">Application submitted for position: <strong>${jobTitle}</strong></p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
        <tr style="border-bottom: 1px solid #27272a;">
          <td style="padding: 10px 0; font-weight: bold; color: #D4AF37;">Applicant Name:</td>
          <td style="padding: 10px 0; color: #ffffff;">${fullName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #27272a;">
          <td style="padding: 10px 0; font-weight: bold; color: #D4AF37;">Email:</td>
          <td style="padding: 10px 0; color: #ffffff;"><a href="mailto:${email}" style="color: #D4AF37;">${email}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #27272a;">
          <td style="padding: 10px 0; font-weight: bold; color: #D4AF37;">Phone:</td>
          <td style="padding: 10px 0; color: #ffffff;">${phone}</td>
        </tr>
        <tr style="border-bottom: 1px solid #27272a;">
          <td style="padding: 10px 0; font-weight: bold; color: #D4AF37;">Experience:</td>
          <td style="padding: 10px 0; color: #ffffff;">${experience || 'N/A'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #27272a;">
          <td style="padding: 10px 0; font-weight: bold; color: #D4AF37;">Portfolio / GitHub:</td>
          <td style="padding: 10px 0; color: #ffffff;">${portfolioUrl ? `<a href="${portfolioUrl}" style="color: #D4AF37;" target="_blank">${portfolioUrl}</a>` : 'N/A'}</td>
        </tr>
      </table>

      ${coverLetter ? `
        <div style="margin-top: 20px; padding: 16px; background-color: #111116; border-radius: 8px; border-left: 4px solid #D4AF37;">
          <h4 style="margin: 0 0 8px 0; color: #D4AF37;">Cover Letter / Details:</h4>
          <p style="margin: 0; color: #e4e4e7; white-space: pre-line;">${coverLetter}</p>
        </div>
      ` : ''}

      <p style="margin-top: 24px; font-size: 12px; color: #71717a; text-align: center;">
        Riyadvi Software Technologies © 2026 — HR Recruitment Desk
      </p>
    </div>
  `;

  return await sendEmail({ to: ADMIN_EMAIL, subject, html });
}
