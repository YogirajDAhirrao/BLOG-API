import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const TOKEN_NAME = "token";

interface AuthRequest extends Request {
  userId?: number;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies[TOKEN_NAME];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
    };
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res
      .status(403)
      .json({ error: "Forbidden: Invalid or expired token" });
  }
};
