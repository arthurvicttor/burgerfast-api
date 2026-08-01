import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...");

  // Admin
  const hash = await bcrypt.hash("123456", 10);
  await prisma.user.upsert({
    where: { email: "admin@burgerfast.com" },
    update: {},
    create: {
      name: "Admin BurgerFast",
      email: "admin@burgerfast.com",
      password: hash,
      role: "ADMIN",
    },
  });

  // Categorias
  const hamburgueres = await prisma.category.upsert({
    where: { slug: "hamburgueres" },
    update: {},
    create: {
      name: "Hambúrgueres",
      slug: "hamburgueres",
      icon: "lunch_dining",
      order: 1,
    },
  });

  const combos = await prisma.category.upsert({
    where: { slug: "combos" },
    update: {},
    create: { name: "Combos", slug: "combos", icon: "restaurant", order: 2 },
  });

  const bebidas = await prisma.category.upsert({
    where: { slug: "bebidas" },
    update: {},
    create: { name: "Bebidas", slug: "bebidas", icon: "local_drink", order: 3 },
  });

  // Produtos
  await prisma.product.upsert({
    where: { id: "prod-1" },
    update: {},
    create: {
      id: "prod-1",
      name: "The Grand Sizzle",
      description:
        "Carne wagyu dupla, cheddar maturado, molho snap-back e picles da casa.",
      price: 14.5,
      featured: true,
      categoryId: hamburgueres.id,
      ingredients: {
        create: [
          { name: "Carne Wagyu", isDefault: true, price: 0 },
          { name: "Cheddar", isDefault: true, price: 0 },
          { name: "Picles", isDefault: true, price: 0 },
          { name: "Bacon Extra", isDefault: false, price: 3.5 },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { id: "prod-2" },
    update: {},
    create: {
      id: "prod-2",
      name: "Bacon Bliss",
      description:
        "Triplo hambúrguer bovino, bacon defumado, queijo extra e infusão de BBQ.",
      price: 16.0,
      featured: true,
      categoryId: hamburgueres.id,
      ingredients: {
        create: [
          { name: "Blend Bovino", isDefault: true, price: 0 },
          { name: "Bacon", isDefault: true, price: 0 },
          { name: "Molho BBQ", isDefault: true, price: 0 },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { id: "prod-3" },
    update: {},
    create: {
      id: "prod-3",
      name: "Combo Grand Sizzle",
      description: "Grand Sizzle + Fritas G + Refrigerante 400ml",
      price: 29.9,
      featured: true,
      categoryId: combos.id,
      ingredients: { create: [] },
    },
  });

  await prisma.product.upsert({
    where: { id: "prod-4" },
    update: {},
    create: {
      id: "prod-4",
      name: "Refrigerante 400ml",
      description: "Coca-Cola, Guaraná ou Sprite bem gelado",
      price: 8.9,
      categoryId: bebidas.id,
      ingredients: { create: [] },
    },
  });

  console.log("✅ Seed concluído!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
