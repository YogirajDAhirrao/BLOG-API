import rateLimit from "express-rate-limit";

// 100 requests per 15 minutes per IP
export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: {
    status: 429,
    error: "Too many requests. Please try again in 15 minutes.",
  },
  standardHeaders: true, // RateLimit-* headers
  legacyHeaders: false, // Disable deprecated headers
});
