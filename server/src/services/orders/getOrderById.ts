import { PrismaClient } from "@prisma/client";

const getOrderById = async (id: string) => {
  const prisma = new PrismaClient();

  const order = await prisma.order.findUnique({
    where: { id },
  });

  return order;
};

export default getOrderById;
