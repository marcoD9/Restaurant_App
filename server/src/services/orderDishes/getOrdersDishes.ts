import { PrismaClient } from "@prisma/client";

const getOrdersDishes = async () => {
  const prisma = new PrismaClient();

  const ordersDish = await prisma.orderDish.findMany({
    include: {
      order: true,
      dish: true,
    },
  });
  return ordersDish;
};

export default getOrdersDishes;
