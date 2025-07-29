import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/post.controller";

const postRouter = express.Router();

// Public route: get all posts
postRouter.get("/", getAllPosts);

// Public route: get a post by ID
postRouter.get("/:id", getPostById);

// Protected route: create a post
postRouter.post("/", createPost);

// Protected route: update a post
postRouter.put("/:id", updatePost);

// Protected route: delete a post
postRouter.delete("/:id", deletePost);

export default postRouter;
