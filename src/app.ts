// src/index.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import { authenticate } from "./middlewares/authMiddleware.js";
import postRouter from "./routes/post.routes.js";
import profileRouter from "./routes/profile.routes.js";
import { swaggerUi, swaggerSpec } from "./utils/swagger.js";
import { apiRateLimiter } from "./middlewares/rateLimiter.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Blog API is running 🚀");
});
app.use(apiRateLimiter);
app.use("/auth", authRouter);
app.use(authenticate);
app.use("/posts", postRouter);
app.use("/profile", profileRouter);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });
export default app;
