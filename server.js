import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

// 🔐 Register
app.post('/api/register', async (req, res) => {
  const { fullName, username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { fullName, username, email, password: hashedPassword },
    });
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(400).json({ error: 'Registration failed' });
  }
});
// 🔐 Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(404).json({ error: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  res.json({ token, user });
});

// 📝 Create Post
app.post('/api/posts', async (req, res) => {
  const { userId, imageUrl, caption } = req.body;

  try {
    const post = await prisma.post.create({
      data: { userId, imageUrl, caption },
    });
    res.status(201).json({ message: 'Post created' });
  } catch (err) {
    console.error("Post creation error:", err); // 👈 Add this
    res.status(400).json({ error: 'Post creation failed' });
  }
});

// 🖼️ Get All Posts
app.get('/api/posts', async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { user: { select: { username: true } } },
  });
  res.json(posts);
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
