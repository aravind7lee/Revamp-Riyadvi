import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    tags: [{ type: String }],
    image: { type: String, required: true },
    date: { type: String, required: true },
    readTime: { type: String, required: true },
    author: {
      name: { type: String, required: true },
      role: { type: String, required: true },
      avatar: { type: String, required: true },
    },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const Blog = mongoose.model('Blog', blogSchema);
