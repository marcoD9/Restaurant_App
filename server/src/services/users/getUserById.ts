import { PrismaClient } from "@prisma/client";

const getUserById = async (id: string) => {
  const prisma = new PrismaClient();

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
    },
  });

  return user;
};

export default getUserById;
