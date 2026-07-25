import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    company: { type: String, default: '' },
    guideTitle: { type: String, default: 'Software Project Planning Guide 2026' },
  },
  { timestamps: true }
);

export const Lead = mongoose.model('Lead', leadSchema);
