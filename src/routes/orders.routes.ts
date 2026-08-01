import { Router } from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
} from "../controllers/orders.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const orderRoutes = Router();

// Pública (totem cria pedido)
orderRoutes.post("/", createOrder);
orderRoutes.get("/:id", getOrderById);

// Protegidas (admin)
orderRoutes.get("/", authMiddleware, getOrders);
orderRoutes.patch("/:id/status", authMiddleware, updateOrderStatus);
