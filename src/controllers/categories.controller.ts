import type { Request, Response } from "express";
import * as service from "../services/categories.service";
import { success, error } from "../utils/response";

export async function getCategories(req: Request, res: Response) {
  try {
    const data = await service.findAll();
    return success(res, data);
  } catch (err: any) {
    return error(res, err.message, 500);
  }
}

export async function getCategoryById(req: Request, res: Response) {
  try {
    const data = await service.findById(req.params.id);
    if (!data) return error(res, "Categoria não encontrada", 404);
    return success(res, data);
  } catch (err: any) {
    return error(res, err.message, 500);
  }
}

export async function createCategory(req: Request, res: Response) {
  try {
    const data = await service.create(req.body);
    return success(res, data, "Categoria criada", 201);
  } catch (err: any) {
    return error(res, err.message);
  }
}

export async function updateCategory(req: Request, res: Response) {
  try {
    const data = await service.update(req.params.id, req.body);
    return success(res, data, "Categoria atualizada");
  } catch (err: any) {
    return error(res, err.message);
  }
}

export async function deleteCategory(req: Request, res: Response) {
  try {
    await service.remove(req.params.id);
    return success(res, null, "Categoria removida");
  } catch (err: any) {
    return error(res, err.message);
  }
}
