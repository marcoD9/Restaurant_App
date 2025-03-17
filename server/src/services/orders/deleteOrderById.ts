import { PrismaClient } from "@prisma/client";

const deleteOrderById = async (id: string) => {
  const prisma = new PrismaClient();

  const order = await prisma.order.deleteMany({
    where: { id },
  });
  return order.count > 0 ? id : null;
};

export default deleteOrderById;
