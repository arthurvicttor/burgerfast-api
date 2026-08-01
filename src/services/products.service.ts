import { prisma } from "../prisma/client";

export async function findAll(categoryId?: string) {
  return prisma.product.findMany({
    where: {
      available: true,
      ...(categoryId && { categoryId }),
    },
    include: { category: true, ingredients: true },
    orderBy: { order: "asc" },
  });
}

export async function findById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true, ingredients: true },
  });
}

export async function create(data: any) {
  const { ingredients, ...productData } = data;
  return prisma.product.create({
    data: {
      ...productData,
      price: parseFloat(productData.price),
      ingredients: ingredients ? { create: ingredients } : undefined,
    },
    include: { category: true, ingredients: true },
  });
}

export async function update(id: string, data: any) {
  const { ingredients, ...productData } = data;
  return prisma.product.update({
    where: { id },
    data: {
      ...productData,
      ...(productData.price && { price: parseFloat(productData.price) }),
    },
    include: { category: true, ingredients: true },
  });
}

export async function remove(id: string) {
  return prisma.product.delete({ where: { id } });
}
