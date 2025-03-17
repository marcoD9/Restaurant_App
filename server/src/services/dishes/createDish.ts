import { PrismaClient } from "@prisma/client";

const createDish = async (
  name: string,
  description: string,
  price: number,
  image: string
) => {
  const newDish = {
    name,
    description,
    price,
    image,
  };

  const prisma = new PrismaClient();
  const dish = await prisma.dish.create({
    data: newDish,
  });
  return dish;
};

export default createDish;
