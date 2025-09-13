import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ─── User Auth Routes ────────────────────────────────────────────────────────

// Register
app.post('/api/register', async (req, res) => {
  const { fullName, username, email, password } = req.body;
  if (!fullName || !username || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { fullName, username, email, password: hash }
    });
    res.status(201).json({ user });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(400).json({ error: 'Registration failed' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const valid = await bcrypt.compare(password, user.password || '');
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  res.json({ token, user });
});

// Google OAuth
app.post('/api/google-auth', async (req, res) => {
  const { fullName, email, username, googleId } = req.body;
  if (!fullName || !email || !username || !googleId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const exists = await prisma.user.findUnique({ where: { username } });
      const finalUsername = exists
        ? `${username}_${Math.floor(Math.random() * 10000)}`
        : username;

      user = await prisma.user.create({
        data: { fullName, email, username: finalUsername, googleId }
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    console.error('Google Auth error:', err);
    res.status(400).json({ error: 'Google authentication failed' });
  }
});

// ─── Post, Like, Comment Routes ───────────────────────────────────────────────

// Create Post (URL only)
app.post('/api/posts', async (req, res) => {
  const { userId, imageUrl, caption = '' } = req.body;
  if (!userId || !imageUrl) {
    return res.status(400).json({ error: 'Missing userId or imageUrl' });
  }

  try {
    const post = await prisma.post.create({
      data: { userId, imageUrl, caption }
    });
    res.status(201).json(post);
  } catch (err) {
    console.error('Post creation error:', err);
    res.status(400).json({ error: 'Post creation failed' });
  }
});

// Like Post
app.post('/api/posts/:id/like', async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await prisma.post.update({
      where: { id: postId },
      data: { likes: { increment: 1 } }
    });
    res.json(post);
  } catch (err) {
    console.error('Like error:', err);
    res.status(400).json({ error: 'Failed to like post' });
  }
});

// Comment on Post
app.post('/api/posts/:id/comment', async (req, res) => {
  const postId = req.params.id;
  const { userId, text } = req.body;
  if (!userId || !text) {
    return res.status(400).json({ error: 'Missing userId or text' });
  }

  try {
    const comment = await prisma.comment.create({
      data: { userId, postId, text }
    });
    res.status(201).json(comment);
  } catch (err) {
    console.error('Comment error:', err);
    res.status(400).json({ error: 'Failed to add comment' });
  }
});

// Get All Posts (with user and comments)
app.get('/api/posts', async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      user: { select: { username: true } },
      comments: {
        include: { user: { select: { username: true } } },
        orderBy: { createdAt: 'asc' }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
  res.json(posts);
});

// Start server
app.listen(5000, () => console.log('Server on http://localhost:5000'));
