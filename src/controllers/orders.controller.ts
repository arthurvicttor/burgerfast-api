import type { Request, Response } from "express";
import * as service from "../services/orders.service";
import { success, error } from "../utils/response";

export async function getOrders(req: Request, res: Response) {
  try {
    const { status } = req.query;
    const data = await service.findAll(status as string | undefined);
    return success(res, data);
  } catch (err: any) {
    return error(res, err.message, 500);
  }
}

export async function getOrderById(req: Request, res: Response) {
  try {
    const data = await service.findById(req.params.id);
    if (!data) return error(res, "Pedido não encontrado", 404);
    return success(res, data);
  } catch (err: any) {
    return error(res, err.message, 500);
  }
}

export async function createOrder(req: Request, res: Response) {
  try {
    const data = await service.create(req.body);
    return success(res, data, "Pedido criado", 201);
  } catch (err: any) {
    return error(res, err.message);
  }
}

export async function updateOrderStatus(req: Request, res: Response) {
  try {
    const { status } = req.body;
    if (!status) return error(res, "Status obrigatório");
    const data = await service.updateStatus(req.params.id, status);
    return success(res, data, "Status atualizado");
  } catch (err: any) {
    return error(res, err.message);
  }
}
