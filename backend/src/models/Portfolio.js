import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    client: { type: String, required: true },
    clientLocation: { type: String, required: true },
    image: { type: String, required: true },
    summary: { type: String, required: true },
    problem: { type: String, required: true },
    solution: { type: String, required: true },
    result: { type: String, required: true },
    metrics: [
      {
        label: { type: String },
        value: { type: String },
      },
    ],
    toolsUsed: [{ type: String }],
  },
  { timestamps: true }
);

export const Portfolio = mongoose.model('Portfolio', portfolioSchema);
