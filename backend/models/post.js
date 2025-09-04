import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    content: { type: String, required: true },
    coverImageUrl: { type: String },
    categories: { type: [String], index: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    published: { type: Boolean, default: true }
  },
  { timestamps: true }
);

postSchema.index({ title: 'text', content: 'text' });

export default mongoose.model('Post', postSchema);