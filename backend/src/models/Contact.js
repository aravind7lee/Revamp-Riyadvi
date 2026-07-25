import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    service: { type: String, default: 'General Inquiry' },
    budget: { type: String, default: 'Not Specified' },
    message: { type: String, required: true },
    status: { type: String, enum: ['New', 'In Progress', 'Responded'], default: 'New' },
  },
  { timestamps: true }
);

export const Contact = mongoose.model('Contact', contactSchema);
