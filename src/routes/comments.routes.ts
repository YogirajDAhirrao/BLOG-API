import express from "express";
import {
  createComment,
  getCommentsForPost,
} from "../controllers/comments.controller";
import { authenticate } from "../middlewares/authMiddleware";

const commentRouter = express.Router();

commentRouter.post("/", authenticate, createComment);
commentRouter.get("/:postId", getCommentsForPost);

export default commentRouter;
