import type { Request, Response } from "express";
import * as service from "../services/products.service";
import { success, error } from "../utils/response";

export async function getProducts(req: Request, res: Response) {
  try {
    const { categoryId } = req.query;
    const data = await service.findAll(categoryId as string | undefined);
    return success(res, data);
  } catch (err: any) {
    return error(res, err.message, 500);
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const data = await service.findById(req.params.id);
    if (!data) return error(res, "Produto não encontrado", 404);
    return success(res, data);
  } catch (err: any) {
    return error(res, err.message, 500);
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;
    const data = await service.create({ ...req.body, image });
    return success(res, data, "Produto criado", 201);
  } catch (err: any) {
    return error(res, err.message);
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;
    const data = await service.update(req.params.id, {
      ...req.body,
      ...(image && { image }),
    });
    return success(res, data, "Produto atualizado");
  } catch (err: any) {
    return error(res, err.message);
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    await service.remove(req.params.id);
    return success(res, null, "Produto removido");
  } catch (err: any) {
    return error(res, err.message);
  }
}
