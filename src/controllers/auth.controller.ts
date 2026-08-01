import type { Request, Response } from "express";
import { loginService, getMeService } from "../services/auth.service";
import { success, error } from "../utils/response";

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return error(res, "Email e senha obrigatórios");
    const result = await loginService(email, password);
    return success(res, result, "Login realizado com sucesso");
  } catch (err: any) {
    return error(res, err.message, 401);
  }
}

export async function me(req: Request, res: Response) {
  try {
    const userId = (req as any).user.id;
    const user = await getMeService(userId);
    return success(res, user);
  } catch (err: any) {
    return error(res, err.message, 404);
  }
}
