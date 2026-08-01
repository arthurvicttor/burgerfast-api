import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";

export const productRoutes = Router();

// Públicas
productRoutes.get("/", getProducts);
productRoutes.get("/:id", getProductById);

// Protegidas
productRoutes.post("/", authMiddleware, upload.single("image"), createProduct);
productRoutes.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  updateProduct,
);
productRoutes.delete("/:id", authMiddleware, deleteProduct);
