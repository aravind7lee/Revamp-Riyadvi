import mongoose from 'mongoose';

const jobApplicationSchema = new mongoose.Schema(
  {
    jobId: { type: String, required: true },
    jobTitle: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    experience: { type: String, default: '' },
    portfolioUrl: { type: String, default: '' },
    linkedinUrl: { type: String, default: '' },
    coverLetter: { type: String, default: '' },
    status: { type: String, enum: ['Applied', 'Reviewing', 'Interview Scheduled', 'Rejected', 'Hired'], default: 'Applied' },
  },
  { timestamps: true }
);

export const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);
