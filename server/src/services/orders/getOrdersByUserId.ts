import { PrismaClient } from "@prisma/client";

const getOrdersByUserId = async (userId: string) => {
  const prisma = new PrismaClient();

  // Check if the user exists
  const userExists = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userExists) {
    return null; // Indicate user not found
  }

  const userOrders = await prisma.order.findMany({
    where: {
      userId: userId,
    },
    include: {
      orderDishes: true,
    },
  });

  return userOrders;
};

export default getOrdersByUserId;
