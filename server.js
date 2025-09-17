import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/generative-ai';



const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Initialize the client (NO `new` keyword!)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Use the updated model name that supports generateContent
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-05-20" });
// ─── User Auth Routes ────────────────────────────────────────────────────────

// Register
// app.post('/api/register', async (req, res) => {
//   const { fullName, username, email, password } = req.body;
//   if (!fullName || !username || !email || !password) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   const hash = await bcrypt.hash(password, 10);
//   try {
//     const user = await prisma.user.create({
//       data: { fullName, username, email, password: hash }
//     });
//     res.status(201).json({ user });
//   } catch (err) {
//     console.error('Registration error:', err);
//     res.status(400).json({ error: 'Registration failed' });
//   }
// });
app.post('/api/register', async (req, res) => {
  const { fullName, username, email, password, gender, avatar, bio } = req.body;
  if (!fullName || !username || !email || !password || !gender || !avatar) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        fullName,
        username,
        email,
        password: hash,
        gender,
        avatar,
        bio
      }
    });
    res.status(201).json({ user });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(400).json({ error: 'Registration failed' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const valid = await bcrypt.compare(password, user.password || '');
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
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


app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    const result = await model.generateContent(message);
    const responseText = result.response.text();

    res.json({ reply: responseText });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to get a response from the bot.' });
  }
});

// Update bio
app.put('/api/user/:id/bio', async (req, res) => {
  const { id } = req.params;
  const { bio } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { bio },
    });
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update bio' });
  }
});

// Get user profile
app.get('/api/user/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        posts: true,
        comments: true,
      },
    });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

app.post("/api/stories", async (req, res) => {
  const { userId, mediaUrl } = req.body;
  if (!userId || !mediaUrl) return res.status(400).json({ error: "Missing fields" });

  const mediaType = /\.(mp4|webm|ogg)$/i.test(mediaUrl)
    ? "video"
    : /\.(gif)$/i.test(mediaUrl)
      ? "gif"
      : "image";

  try {
    const story = await prisma.story.create({
      data: { userId, mediaUrl, mediaType },
    });
    res.json(story);
  } catch (err) {
    res.status(500).json({ error: "Failed to create story" });
  }
});

app.get("/api/stories", async (req, res) => {
  try {
    const stories = await prisma.story.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stories" });
  }
});



// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server on http://localhost:${port}`);
});
