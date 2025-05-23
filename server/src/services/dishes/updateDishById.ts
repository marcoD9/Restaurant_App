import { PrismaClient, Prisma } from "@prisma/client";

const updateDishById = async (
  id: string,
  updatedDish: Prisma.DishUpdateInput // Type generated by Prisma representing the allowed update fields for the Dish model
) => {
  const prisma = new PrismaClient();
  const dish = await prisma.dish.updateMany({
    where: { id },
    data: updatedDish,
  });
  return dish.count > 0 ? id : null;
};

export default updateDishById;
