import { PrismaClient } from "@prisma/client";

const getDishById = async (id: string) => {
  const prisma = new PrismaClient();
  const dish = await prisma.dish.findUnique({
    where: { id },
  });
  return dish;
};

export default getDishById;
