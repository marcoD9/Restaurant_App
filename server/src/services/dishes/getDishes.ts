import { PrismaClient } from "@prisma/client";

const getDishes = async () => {
  const prisma = new PrismaClient();
  const dishes = await prisma.dish.findMany();
  return dishes;
};

export default getDishes;
