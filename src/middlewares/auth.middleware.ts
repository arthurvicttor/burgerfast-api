import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { error } from "../utils/response";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return error(res, "Token não fornecido", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyToken(token);
    (req as any).user = payload;
    next();
  } catch {
    return error(res, "Token inválido ou expirado", 401);
  }
}
