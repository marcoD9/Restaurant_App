import { PrismaClient } from "@prisma/client";

const getOrders = async () => {
  const prisma = new PrismaClient();

  const orders = await prisma.order.findMany({});

  return orders;
};

export default getOrders;
