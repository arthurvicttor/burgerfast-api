import { prisma } from "../prisma/client";

export async function findAll() {
  return prisma.category.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });
}

export async function findById(id: string) {
  return prisma.category.findUnique({ where: { id } });
}

export async function create(data: any) {
  return prisma.category.create({ data });
}

export async function update(id: string, data: any) {
  return prisma.category.update({ where: { id }, data });
}

export async function remove(id: string) {
  return prisma.category.delete({ where: { id } });
}
