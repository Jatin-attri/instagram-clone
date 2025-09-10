import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Test route
app.get("/api/posts", async (req, res) => {
  const posts = await prisma.post.findMany({ include: { author: true } });
  res.json(posts);
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
