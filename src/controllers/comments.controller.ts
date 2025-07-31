import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export interface AuthRequest extends Request {
  userId?: string;
}

export const createComment = async (req: AuthRequest, res: Response) => {
  try {
    const { content, postId } = req.body;

    if (!content || !postId) {
      return res
        .status(400)
        .json({ message: "Content and postId are required." });
    }

    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: req.userId!,
      },
    });

    res.status(201).json({ message: "Comment created", comment });
  } catch (err) {
    console.error("Create comment error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCommentsForPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        author: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ comments });
  } catch (err) {
    console.error("Get comments error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
