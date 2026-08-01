import type { Response } from "express";

export function success<T>(
  res: Response,
  data: T,
  message = "OK",
  status = 200,
) {
  return res.status(status).json({ success: true, message, data });
}

export function error(res: Response, message: string, status = 400) {
  return res.status(status).json({ success: false, message, data: null });
}
