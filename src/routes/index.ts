import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { categoryRoutes } from "./categories.routes";
import { productRoutes } from "./products.routes";
import { orderRoutes } from "./orders.routes";

export const router = Router();

router.get("/health", (req, res) => {
  res.json({ success: true, message: "BurgerFast API online!" });
});

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
