import { PrismaClient } from "@prisma/client";

const deleteDishById = async (id: string) => {
  const prisma = new PrismaClient();

  const dish = await prisma.dish.deleteMany({
    where: { id },
  });
  return dish.count > 0 ? id : null;
};

export default deleteDishById;
