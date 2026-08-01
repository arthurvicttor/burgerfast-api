import { Router } from "express";
import {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const categoryRoutes = Router();

// Públicas
categoryRoutes.get("/", getCategories);
categoryRoutes.get("/:id", getCategoryById);

// Protegidas
categoryRoutes.post("/", authMiddleware, createCategory);
categoryRoutes.put("/:id", authMiddleware, updateCategory);
categoryRoutes.delete("/:id", authMiddleware, deleteCategory);
