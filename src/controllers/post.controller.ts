import { Request, Response } from "express";
import { prisma } from "../config/prisma";
export interface AuthRequest extends Request {
  userId?: string; // or number, depending on your user ID type
}

// Create a new post
export const createPost = async (req: AuthRequest, res: Response) => {
  const { title, content } = req.body;
  const userId = req.userId; // from auth middleware

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: userId missing" });
  }

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });

    res.status(201).json(post);
  } catch (err) {
    console.error("Create post error:", err);
    res.status(500).json({ error: "Failed to create post" });
  }
};

// Get all posts with author and comment count
export const getAllPosts = async (_req: AuthRequest, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
        comments: true,
      },
    });

    res.json(posts);
  } catch (err) {
    console.error("Get posts error:", err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

// Get a single post by ID
export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        comments: {
          include: {
            author: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });

    if (!post) return res.status(404).json({ error: "Post not found" });

    res.json(post);
  } catch (err) {
    console.error("Get post by ID error:", err);
    res.status(500).json({ error: "Failed to fetch post" });
  }
};

// Update a post
export const updatePost = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = req.userId;

  try {
    const existingPost = await prisma.post.findUnique({ where: { id } });

    if (!existingPost) return res.status(404).json({ error: "Post not found" });
    if (existingPost.authorId !== userId)
      return res.status(403).json({ error: "Not authorized" });

    const updated = await prisma.post.update({
      where: { id },
      data: { title, content },
    });

    res.json(updated);
  } catch (err) {
    console.error("Update post error:", err);
    res.status(500).json({ error: "Failed to update post" });
  }
};

// Delete a post
export const deletePost = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.authorId !== userId)
      return res.status(403).json({ error: "Not authorized" });

    await prisma.post.delete({ where: { id } });
    res.json({ message: "Post deleted" });
  } catch (err) {
    console.error("Delete post error:", err);
    res.status(500).json({ error: "Failed to delete post" });
  }
};
