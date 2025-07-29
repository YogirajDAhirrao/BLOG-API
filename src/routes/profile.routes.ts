import express from "express";
import {
  getProfile,
  updateProfile,
} from "../controllers/profile.controller.js";

const profileRouter = express.Router();

profileRouter.get("/me", getProfile);
profileRouter.put("/update", updateProfile);

export default profileRouter;
