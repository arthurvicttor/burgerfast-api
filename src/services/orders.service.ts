import { prisma } from "../prisma/client";
import type { OrderStatus } from "@prisma/client";

function generateOrderNumber(): string {
  const num = Math.floor(Math.random() * 9999) + 1;
  return String(num).padStart(4, "0");
}

export async function findAll(status?: string) {
  return prisma.order.findMany({
    where: { ...(status && { status: status as OrderStatus }) },
    include: {
      items: { include: { product: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function findById(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      items: { include: { product: true } },
    },
  });
}

export async function create(data: any) {
  const { items, ...orderData } = data;

  const total = items.reduce(
    (acc: number, item: any) => acc + item.unitPrice * item.quantity,
    0,
  );

  return prisma.order.create({
    data: {
      ...orderData,
      orderNumber: generateOrderNumber(),
      total,
      items: {
        create: items.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          notes: item.notes ?? null,
          removedIngredients: item.removedIngredients ?? [],
          addedIngredients: item.addedIngredients ?? [],
        })),
      },
    },
    include: {
      items: { include: { product: true } },
    },
  });
}

export async function updateStatus(id: string, status: OrderStatus) {
  return prisma.order.update({
    where: { id },
    data: { status },
  });
}
