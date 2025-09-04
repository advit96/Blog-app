import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import slugify from 'slugify';
import Post from '../models/post.js';
import { requireAuth } from '../middlewares/authentication.js';

const router = Router();

router.get('/', async (req, res) => {
  const { q, category, page = 1, limit = 10, author, sort = '-createdAt' } = req.query;

  const filter = {};
  if (q) filter.$text = { $search: q };
  if (category) filter.categories = category;
  if (author) filter.author = author;

  const perPage = Math.max(1, Math.min(parseInt(limit, 10) || 10, 50));
  const pageNum = Math.max(1, parseInt(page, 10) || 1);

  const [items, total] = await Promise.all([
    Post.find(filter)
      .sort(sort)
      .skip((pageNum - 1) * perPage)
      .limit(perPage)
      .populate('author', 'name'),
    Post.countDocuments(filter)
  ]);

  res.json({
    items,
    pagination: { total, page: pageNum, limit: perPage, pages: Math.ceil(total / perPage) }
  });
});

router.get('/:slug', async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate('author', 'name');
  if (!post) return res.status(404).json({ message: 'Not found' });
  res.json(post);
});

router.post('/', requireAuth, [body('title').isLength({ min: 3 }), body('content').isLength({ min: 10 })], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title, content, categories = [], coverImageUrl } = req.body;
  const slug = slugify(title, { lower: true, strict: true });

  const existing = await Post.findOne({ slug });
  if (existing) return res.status(409).json({ message: 'Title already used' });

  const post = await Post.create({ title, content, categories, coverImageUrl, slug, author: req.user.userId });
  res.status(201).json(post);
});

router.put('/:slug', requireAuth, [body('title').optional().isLength({ min: 3 }), body('content').optional().isLength({ min: 10 })], async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  if (!post) return res.status(404).json({ message: 'Not found' });
  if (post.author.toString() !== req.user.userId) return res.status(403).json({ message: 'Forbidden' });

  const updates = req.body;
  if (updates.title) updates.slug = slugify(updates.title, { lower: true, strict: true });
  const updated = await Post.findByIdAndUpdate(post._id, updates, { new: true });
  res.json(updated);
});

router.delete('/:slug', requireAuth, async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug });
  if (!post) return res.status(404).json({ message: 'Not found' });
  if (post.author.toString() !== req.user.userId) return res.status(403).json({ message: 'Forbidden' });
  await Post.findByIdAndDelete(post._id);
  res.json({ success: true });
});

export default router;


